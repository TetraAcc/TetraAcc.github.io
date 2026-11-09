/**
 * Cloudflare Worker: Spotify Now Playing & Recently Played Bridge
 *
 * 优化特性：
 * 1. 实时展示正在播放 (NOW PLAYING)；
 * 2. 停播后主动保留上一首曲目 (RECENTLY PLAYED)，规避 Spotify 429 限流；
 * 3. 超过指定时长未听歌（如超过 24 小时），自动淡出恢复为干净的“未在播放”休眠状态。
 */

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const CACHE_KEY = 'https://spotify-cache.internal/last-played'

/**
 * 历史曲目最长保留时间（毫秒）
 * 默认 24 小时：听完歌 24 小时之内显示 RECENTLY PLAYED；
 * 超过 24 小时没开 Spotify，则自动变回纯粹的“未在播放”。
 */
const RECENT_TRACK_TTL_MS = 24 * 60 * 60 * 1000

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json;charset=UTF-8',
  'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30'
}

let memoryLastTrack = null

async function getAccessToken(env) {
  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN
    })
  })
  return response.json()
}

async function getLastTrackFromCache() {
  if (memoryLastTrack) return memoryLastTrack
  try {
    const cache = caches.default
    const res = await cache.match(new Request(CACHE_KEY))
    if (res) {
      memoryLastTrack = await res.json()
      return memoryLastTrack
    }
  } catch {}
  return null
}

async function saveLastTrackToCache(track, ctx) {
  memoryLastTrack = track
  try {
    const cache = caches.default
    const res = new Response(JSON.stringify(track), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400'
      }
    })
    const req = new Request(CACHE_KEY)
    if (ctx && ctx.waitUntil) {
      ctx.waitUntil(cache.put(req, res))
    } else {
      await cache.put(req, res)
    }
  } catch {}
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    try {
      const { access_token } = await getAccessToken(env)
      const headers = { Authorization: `Bearer ${access_token}` }

      // 1. 先查当前是否正在播放
      const nowRes = await fetch(NOW_PLAYING_ENDPOINT, { headers })
      if (nowRes.status === 200) {
        const song = await nowRes.json()
        if (song && song.item) {
          const trackData = {
            title: song.item.name,
            artist: song.item.artists?.map((a) => a.name).join(', ') || '',
            album: song.item.album?.name || '',
            albumImageUrl: song.item.album?.images?.[0]?.url || '',
            songUrl: song.item.external_urls?.spotify || '',
            playedAt: Date.now()
          }

          // 记忆此曲目到边缘缓存
          await saveLastTrackToCache(trackData, ctx)

          return new Response(
            JSON.stringify({
              isPlaying: Boolean(song.is_playing),
              ...trackData
            }),
            { headers: CORS_HEADERS }
          )
        }
      }

      // 2. 当前未在播放 (204) 时，优先读取记忆中的上一首曲目
      const rememberedTrack = await getLastTrackFromCache()
      if (rememberedTrack && rememberedTrack.title) {
        const playedAt = rememberedTrack.playedAt || 0
        const age = Date.now() - playedAt

        // 仅在保留时长（默认24小时）内展示 RECENTLY PLAYED，超期自动回归“未在播放”
        if (playedAt === 0 || age <= RECENT_TRACK_TTL_MS) {
          return new Response(
            JSON.stringify({
              isPlaying: false,
              ...rememberedTrack
            }),
            { headers: CORS_HEADERS }
          )
        }
      }

      // 3. 若缓存为空，才尝试向 Spotify 请求最近播放记录
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, { headers })
      if (recentRes.status === 200) {
        const recentData = await recentRes.json()
        const track = recentData?.items?.[0]?.track
        if (track) {
          const trackData = {
            title: track.name,
            artist: track.artists?.map((a) => a.name).join(', ') || '',
            album: track.album?.name || '',
            albumImageUrl: track.album?.images?.[0]?.url || '',
            songUrl: track.external_urls?.spotify || '',
            playedAt: Date.now()
          }
          await saveLastTrackToCache(trackData, ctx)
          return new Response(
            JSON.stringify({
              isPlaying: false,
              ...trackData
            }),
            { headers: CORS_HEADERS }
          )
        }
      }

      // 4. 超期或无数据时，干净休眠返回“未在播放”
      return new Response(JSON.stringify({ isPlaying: false }), { headers: CORS_HEADERS })
    } catch (err) {
      return new Response(
        JSON.stringify({ isPlaying: false, error: String(err) }),
        { status: 500, headers: CORS_HEADERS }
      )
    }
  }
}
