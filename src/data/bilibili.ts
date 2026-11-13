import bilibiliData from '@/content/bilibili.json'

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
  seriesUrl?: string
  items: BilibiliVideo[]
}

export const bilibiliArchive: BilibiliSection[] = (
  'sections' in bilibiliData ? bilibiliData.sections : bilibiliData
) as BilibiliSection[]
