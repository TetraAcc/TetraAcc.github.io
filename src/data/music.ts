export interface CuratedTrack {
  /** 直接粘贴 Spotify 分享链接即可（支持 track / album / playlist，含 intl-ja 等区域前缀均可自动识别） */
  spotifyUrl: string
  /** 曲名与艺人（用于未配置 API 时的回退展示或无障碍标签） */
  title: string
  artist: string
  /** 你的私人听歌随感（支持三语切换；如果只填 zh 也会默认显示） */
  note: {
    zh: string
    ja?: string
    en?: string
  }
}

/**
 * 方案二：Cloudflare Worker 实时状态接口地址
 * 部署好 scripts/spotify-worker.js 并绑定子域名（如 https://spotify.tetraacc.me）后填入此处。
 * 留空时会在本地显示预览演示状态。
 */
export const SPOTIFY_NOW_PLAYING_API = 'https://spotifynowplayin.tetrahrt.workers.dev'

/**
 * 方案一（A）：常驻公开歌单链接（可选）
 * 在 Spotify App 里往这个歌单加歌/删歌，网页会自动同步，无需改代码。
 * 不想显示整张歌单时留空 '' 即可。
 */
export const SPOTIFY_FEATURED_PLAYLIST = 'https://open.spotify.com/playlist/7FzgzQfDXemSt1jqA5KIQl'

/**
 * 网易云音乐常驻歌单配置（我喜欢的音乐）
 */
export const NETEASE_FEATURED_PLAYLIST_ID = '431954493'
export const NETEASE_FEATURED_PLAYLIST_URL =
  'https://music.163.com/playlist?id=431954493&uct2=U2FsdGVkX18oYdnK5HwpJup2atHcPCok4FY3jppbgJ4='

/**
 * 方案一（B）：单曲推荐与随想列表
 * 平时想推新歌，只需要从 Spotify 复制歌曲链接粘到下面数组里即可。
 */
export const CURATED_TRACKS: CuratedTrack[] = []
