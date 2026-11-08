/**
 * Cloudflare Worker: Spotify Now Playing & Recently Played Bridge
 *
 * 部署步骤：
 * 1. 登录 Cloudflare Dashboard -> Workers & Pages -> Create Worker
 * 2. 将本文件代码粘贴进去并部署（可绑定自定义域如 spotify.tetraacc.me）
 * 3. 在 Worker 的 Settings -> Variables and Secrets 中添加 3 个环境变量：
 *    - SPOTIFY_CLIENT_ID
 *    - SPOTIFY_CLIENT_SECRET
 *    - SPOTIFY_REFRESH_TOKEN （运行本地 node.exe scripts/get-spotify-token.mjs 一键获取）
 * 4. 将 Worker 地址填入 src/data/music.ts 的 SPOTIFY_NOW_PLAYING_API 中即可。
 */

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json;charset=UTF-8',
  'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30'
}

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

export default {
  async fetch(request, env) {
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
          return new Response(
            JSON.stringify({
              isPlaying: Boolean(song.is_playing),
              title: song.item.name,
              artist: song.item.artists.map((a) => a.name).join(', '),
              album: song.item.album.name,
              albumImageUrl: song.item.album.images?.[0]?.url || '',
              songUrl: song.item.external_urls?.spotify || ''
            }),
            { headers: CORS_HEADERS }
          )
        }
      }

      // 2. 若当前未播放 (204)，自动回退获取最近播放的一首歌
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, { headers })
      if (recentRes.status === 200) {
        const recentData = await recentRes.json()
        const track = recentData?.items?.[0]?.track
        if (track) {
          return new Response(
            JSON.stringify({
              isPlaying: false,
              title: track.name,
              artist: track.artists.map((a) => a.name).join(', '),
              album: track.album.name,
              albumImageUrl: track.album.images?.[0]?.url || '',
              songUrl: track.external_urls?.spotify || ''
            }),
            { headers: CORS_HEADERS }
          )
        }
      }

      return new Response(JSON.stringify({ isPlaying: false }), { headers: CORS_HEADERS })
    } catch (err) {
      return new Response(
        JSON.stringify({ isPlaying: false, error: String(err) }),
        { status: 500, headers: CORS_HEADERS }
      )
    }
  }
}
