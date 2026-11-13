export interface CalendarConfig {
  /**
   * ICS 日历源地址。
   * 支持本地相对路径（如 '/calendar.ics'），或宿主机 Cloudflare Tunnel 映射的外网域名（如 'https://calendar.tetraacc.me/calendar.ics'）。
   */
  icsUrl: string
  /**
   * 苹果/系统日历一键唤起订阅链接（webcal:// 协议）
   */
  webcalUrl: string
  /**
   * Google Calendar 快速添加链接
   */
  googleCalUrl: string
  /**
   * 默认时区
   */
  defaultTimezone: 'Asia/Tokyo' | 'Asia/Shanghai'
}

export const CALENDAR_CONFIG: CalendarConfig = {
  icsUrl: 'https://cal.tetraacc.me/calendar.ics',
  webcalUrl: 'webcal://cal.tetraacc.me/calendar.ics',
  googleCalUrl:
    'https://calendar.google.com/calendar/u/0/r?cid=webcal%3A%2F%2Fcal.tetraacc.me%2Fcalendar.ics',
  defaultTimezone: 'Asia/Tokyo'
}
