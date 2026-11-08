/**
 * 本地一键获取 Spotify Refresh Token 辅助脚本
 *
 * 用法：
 * 1. 在 Spotify Developer Dashboard (https://developer.spotify.com/dashboard) 打开你的 App
 * 2. 在 Settings -> Redirect URIs 中添加： http://127.0.0.1:8888/callback 并保存
 * 3. 在终端运行：
 *    node.exe scripts/get-spotify-token.mjs <你的_CLIENT_ID> <你的_CLIENT_SECRET>
 */

import http from 'node:http'
import { URL } from 'node:url'

const [clientId, clientSecret] = process.argv.slice(2)

if (!clientId || !clientSecret) {
  console.log('\n用法: node.exe scripts/get-spotify-token.mjs <CLIENT_ID> <CLIENT_SECRET>\n')
  console.log('提示: 请先在 Spotify 开发者后台将 Redirect URI 设置为: http://127.0.0.1:8888/callback\n')
  process.exit(1)
}

const redirectUri = 'http://127.0.0.1:8888/callback'
const scopes = 'user-read-currently-playing user-read-recently-played'

const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri
  }).toString()

console.log('\n=============================================================')
console.log('请在浏览器中打开以下链接并点击同意授权：')
console.log(authUrl)
console.log('=============================================================\n')

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, 'http://127.0.0.1:8888')
  if (reqUrl.pathname !== '/callback') {
    res.writeHead(404)
    res.end()
    return
  }

  const code = reqUrl.searchParams.get('code')
  if (!code) {
    res.writeHead(400)
    res.end('Missing code parameter')
    return
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri
    })
  })

  const data = await tokenRes.json()
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
  res.end('<h2>✅ Refresh Token 获取成功！请返回终端查看。</h2>')

  console.log('\n🎉 成功获取！请将以下 3 个变量填入 Cloudflare Worker 环境变量：\n')
  console.log(`SPOTIFY_CLIENT_ID=${clientId}`)
  console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`)
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`)

  server.close()
  process.exit(0)
})

server.listen(8888)
