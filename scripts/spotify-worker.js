/**
 * Cloudflare Worker: Spotify Now Playing & Recently Played Bridge
 *
 * 优化特性：
 * 1. 支持正在播放实时展示 (NOW PLAYING)
 * 2. 智能边缘缓存记忆上一首听过的曲目，彻底规避 Spotify 官方对开发模式 recently-played 接口的 429 限流
 * 3. 停播时自动无缝展示 (RECENTLY PLAYED)，无需频繁请求受限的历史接口
 */

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const CACHE_KEY = 'https://spotify-cache.internal/last-played'

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
            songUrl: song.item.external_urls?.spotify || ''
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

      // 2. 当前未在播放 (204) 时，优先读取记忆中的上一首曲目（避免触发 Spotify 429 Quota Exceeded）
      const rememberedTrack = await getLastTrackFromCache()
      if (rememberedTrack) {
        return new Response(
          JSON.stringify({
            isPlaying: false,
            ...rememberedTrack
          }),
          { headers: CORS_HEADERS }
        )
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
            songUrl: track.external_urls?.spotify || ''
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

      // 4. 完全无数据回退
      return new Response(JSON.stringify({ isPlaying: false }), { headers: CORS_HEADERS })
    } catch (err) {
      return new Response(
        JSON.stringify({ isPlaying: false, error: String(err) }),
        { status: 500, headers: CORS_HEADERS }
      )
    }
  }
}
