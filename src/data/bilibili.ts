export interface BilibiliVideo {
  bvid: string
  title: string
  tag: string
  desc: string
  date: string
  pic: string
}

export interface BilibiliSection {
  id: string
  title: {
    zh: string
    ja: string
    en: string
  }
  description: {
    zh: string
    ja: string
    en: string
  }
  items: BilibiliVideo[]
}

export const bilibiliArchive: BilibiliSection[] = [
  {
    id: 'radio',
    title: {
      zh: '双极电台 · Radio',
      ja: '双極ラジオ · Radio',
      en: 'Bipolar Radio'
    },
    description: {
      zh: '个人漫谈与声音随笔，记录关于音乐、时代与生活琐碎的碎碎念。',
      ja: '個人的な雑談と音声エッセイ。音楽や時代、日常のあれこれを語るラジオ。',
      en: 'Personal podcast & audio essays, rambling about music, memories, and life.'
    },
    items: [
      {
        bvid: 'BV1i5fSYXE4Y',
        title: '【双极电台】04 Feeling SAO today',
        tag: 'Vol. 04',
        desc: '双极电台第 04 期漫谈',
        date: '2025.01',
        pic: 'https://i2.hdslb.com/bfs/archive/4609c2a9ffca570c589c7dd8b98341680beb171a.jpg'
      },
      {
        bvid: 'BV1N5UDYjEvP',
        title: '【双极电台】03 朋克可能不死 朋克不死不太可能',
        tag: 'Vol. 03',
        desc: '双极电台第 03 期漫谈',
        date: '2024.11',
        pic: 'https://i2.hdslb.com/bfs/archive/b065b7cc4e1928ac76abf5be8dc41b940e02c603.png'
      },
      {
        bvid: 'BV1b64y1n7dh',
        title: '【双极电台】02 当年明月在',
        tag: 'Vol. 02',
        desc: '双极电台第 02 期漫谈',
        date: '2023.12',
        pic: 'https://i1.hdslb.com/bfs/archive/ae1f5ad05e2ff90796aa99c1dcf1e5c0250a60d9.jpg'
      },
      {
        bvid: 'BV1o94y1P749',
        title: '【双极电台】01 我的少女时代（没有少女）',
        tag: 'Vol. 01',
        desc: '双极电台第 01 期漫谈',
        date: '2023.12',
        pic: 'https://i2.hdslb.com/bfs/archive/989fe552457a711372b14ec292916fb5558157ac.jpg'
      }
    ]
  },
  {
    id: 'cover',
    title: {
      zh: '翻唱与演奏 · Cover',
      ja: 'カバー＆セッション · Cover',
      en: 'Covers & Sessions'
    },
    description: {
      zh: '吉他弹唱、木吉他独奏与山形大学轻音部的乐队排练记录。',
      ja: '弾き語り、アコースティックセッション、山形大学軽音部でのバンド練習記録。',
      en: 'Acoustic covers, guitar sessions, and Yamagata University light music club recordings.'
    },
    items: [
      {
        bvid: 'BV1SXm1BhEZF',
        title: "She's Electric / Slide Away (Oasis Cover)",
        tag: 'Acoustic',
        desc: 'Acoustic Ver. @Street Shuffle',
        date: '2025.12',
        pic: 'https://i0.hdslb.com/bfs/archive/6f534ecdbae4a3e27945b31368599d47cb91ba21.jpg'
      },
      {
        bvid: 'BV1E8JazQEFj',
        title: 'Creep (Radiohead Cover)',
        tag: 'Acoustic',
        desc: 'Acoustic Version Cover',
        date: '2025.05',
        pic: 'https://i1.hdslb.com/bfs/archive/2c35dde1835bbd5bec700605f2fce9aaf579bba5.jpg'
      },
      {
        bvid: 'BV1zaVbzcExj',
        title: 'Obstacles (Syd Matters Cover)',
        tag: 'Guitar Cover',
        desc: '《Life is Strange》奇异人生 OST',
        date: '2025.05',
        pic: 'https://i2.hdslb.com/bfs/archive/3f41a1c4bd41d18530572fa1fba65e40ec0504ad.jpg'
      },
      {
        bvid: 'BV1kApFenEBH',
        title: "Anyway here's 《Wonderwall》",
        tag: 'Guitar Cover',
        desc: 'Oasis 经典曲目吉他演奏',
        date: '2024.09',
        pic: 'https://i0.hdslb.com/bfs/archive/edd9006b156f4e41320bcfdc6d2e64ea4146464d.jpg'
      },
      {
        bvid: 'BV1ZKgMeTEvk',
        title: "Rock 'n' Roll Star / Live Forever / DLBIA",
        tag: 'Band Session',
        desc: 'Cover by 山形大学轻音部',
        date: '2024.06',
        pic: 'https://i1.hdslb.com/bfs/archive/accaa18b4adc1f05ca5de120c01af15c78466002.jpg'
      },
      {
        bvid: 'BV1bBVGekEs5',
        title: 'Dani California / Basket Case',
        tag: 'Band Session',
        desc: 'RHCP & Green Day · 山形大学轻音部',
        date: '2024.06',
        pic: 'https://i1.hdslb.com/bfs/archive/744d3d8565ce8b1b180738dbe0c956693cfd4dfc.jpg'
      }
    ]
  },
  {
    id: 'live',
    title: {
      zh: '现场见证 · Live Archive',
      ja: 'ライブ記録 · Live Archive',
      en: 'Live Archive'
    },
    description: {
      zh: '摇滚现场见证与音乐节足迹，留住音乐在空气中振动的瞬间。',
      ja: 'ロックライブや音楽フェスの現地記録。生の音楽が空気を震わせた瞬間。',
      en: 'Concert and festival footprints. Preserving the live resonance in the air.'
    },
    items: [
      {
        bvid: 'BV15G411Q7fP',
        title: 'Coldplay - The Scientist',
        tag: 'Tokyo Dome',
        desc: '2023.11 Tokyo Dome · Music of the Spheres',
        date: '2023.11',
        pic: 'https://i2.hdslb.com/bfs/archive/300cd9d630667386cd5366bd331515ca41c17206.jpg'
      },
      {
        bvid: 'BV1eC4y1U7Yr',
        title: 'Coldplay - Paradise',
        tag: 'Tokyo Dome',
        desc: '2023.11 Tokyo Dome · Music of the Spheres',
        date: '2023.11',
        pic: 'https://i2.hdslb.com/bfs/archive/d1dc5d68c9d4b8d39f9b34f8d111e4b7017d079a.jpg'
      },
      {
        bvid: 'BV1oh4y1T7Pn',
        title: 'Two Door Cinema Club - Sun (Mash-up)',
        tag: 'Summer Sonic',
        desc: '2023.8 大阪 SummerSonic Day2 现场',
        date: '2023.08',
        pic: 'https://i2.hdslb.com/bfs/archive/c43dd3ff6e2996eb087420d2cba90b1699f0547d.jpg'
      },
      {
        bvid: 'BV1xG411Z7B3',
        title: 'Fall Out Boy - Grand Theft Autumn',
        tag: 'Summer Sonic',
        desc: '2023.8 大阪 SummerSonic 现场',
        date: '2023.08',
        pic: 'https://i1.hdslb.com/bfs/archive/6afe9ef1976e7dcc1632d8bfa7fac3697a92cf9d.jpg'
      },
      {
        bvid: 'BV1Au411N7XW',
        title: 'Two Door Cinema Club - What You Know',
        tag: 'Summer Sonic',
        desc: '2023.8 大阪 SummerSonic Day2 现场',
        date: '2023.08',
        pic: 'https://i0.hdslb.com/bfs/archive/b2c389e7e559c339af650f3d07a60b87fd4ae0f5.jpg'
      }
    ]
  }
]
