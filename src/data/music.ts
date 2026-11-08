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
export const SPOTIFY_FEATURED_PLAYLIST = 'https://open.spotify.com/playlist/37i9dQZF1DX8Uebhn9wzrS'

/**
 * 方案一（B）：单曲推荐与随想列表
 * 平时想推新歌，只需要从 Spotify 复制歌曲链接粘到下面数组里即可。
 */
export const CURATED_TRACKS: CuratedTrack[] = [
  {
    spotifyUrl: 'https://open.spotify.com/track/08kTO4EW0jb07zNsCNM83w',
    title: '言葉にできない',
    artist: '小田和正 (Kazumasa Oda)',
    note: {
      zh: '北国入冬的傍晚走路回住处，耳机里放这首总觉得时间慢了半拍。',
      ja: '米沢の冬の夕暮れ、帰り道によく聴く一曲。',
      en: 'For quiet evening walks in northern Japan before winter sets in.'
    }
  },
  {
    spotifyUrl: 'https://open.spotify.com/track/5I6ff02J9s433N0989F3G9',
    title: 'Merry Christmas Mr. Lawrence',
    artist: 'Ryuichi Sakamoto (坂本龙一)',
    note: {
      zh: '干净克制，写代码或雨天看长文时的最佳背景音。',
      ja: '静かで抑制の効いたピアノ。深夜のコーディングや雨の日の読書に。',
      en: 'Clean and restrained, ideal for late-night coding or rainy-day reading.'
    }
  },
  {
    spotifyUrl: 'https://open.spotify.com/track/0bXpmJyHHYPk6QBFj25bYF',
    title: 'Long Season',
    artist: 'Fishmans',
    note: {
      zh: '鼓点与合成器一出来整个人就静下来了，适合独自待到凌晨的时候听。',
      ja: 'リズムが鳴り始めた瞬間に心が落ち着く、深夜の定番曲。',
      en: 'The moment the rhythm kicks in, everything slows down.'
    }
  }
]
