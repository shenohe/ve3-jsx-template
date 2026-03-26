import { useImageLoader } from "@/hooks";

// 商家类型
export const businessType = [
  {
    value: 1,
    label: "医美",
  },
  {
    value: 2,
    label: "酒店"
  },
  {
    value: 3,
    label: "景区"
  },
  {
    value: 4,
    label: "休娱"
  },
  {
    value: 5,
    label: "其他"
  }
]

export const ORDER_TYPE = [
  {
    label: '网址',
    value: 'url'
  },
  {
    label: '图片',
    value: 'image'
  },
  {
    label: '小程序',
    value: 'miniprogram'
  }
]

export const CHANNEL_GUIODE = {
  'red-book': ['red-book-1.png', 'red-book-2.png'],
  'tiktok': ['tiktok-1.png', 'tiktok-2.png'],
  'tiktok-follow': ['tiktok-follow-1.png', 'tiktok-follow-2.png', 'tiktok-follow-3.png', 'tiktok-follow-4.png'],
  'kwai': ['kwai-1.png', 'kwai-2.png', 'kwai-3.png'],
  'meituan': ['meituan-1.png', 'meituan-2.png'],
  'rabbr': ['rabbr-1.png', 'rabbr-2.png'],
  'wechat': ['wechat-1.png', 'wechat-2.png', 'wechat-3.png', 'wechat-4.png'],
  'dianping-mini': ['dianping-mini-1.png', 'dianping-mini-2.png'],
  'kdb': ['kdb-1.png', 'kdb-2.png','kdb-3.png', 'kdb-4.png', 'kdb-5.png'],
  'kdb-1': ['kdb-1.png', 'kdb-2.png','kdb-3.png', 'kdb-6.png', 'kdb-7.png'],
  'kdb-2': ['kdb-1.png', 'kdb-2.png','kdb-3.png', 'kdb-8.png', 'kdb-9.png'],
  'meituan-mini': ['meituan-mini-1.png', 'meituan-mini-2.png'],
  'wechat-like': ['wechat-like-1.png', 'wechat-like-2.png', 'wechat-like-3.png', 'wechat-like-4.png'],
  'ctrip-mini': ['ctrip-mini-1.png', 'ctrip-mini-2.png'],
  'qunar-mini': ['qunar-mini-1.png', 'qunar-mini-2.png'],
  'flypig-mini': ['flypig-mini-1.png', 'flypig-mini-2.png'],
  'amap': ['amap-1.png', 'amap-2.png'],
  'ctrip-note': ['ctrip-1.png', 'ctrip-2.png'],
}

export const GROUP_BUY_PLATFORM = [
  {
    label: '抖音',
    value: 'tiktok',
    icon: 'tiktok.png'
  },
  {
    label: '美团',
    value: 'meituan',
    icon: 'meituan.png'
  },
  {
    label: '大众点评',
    value: 'rabbr',
    icon: 'rabbr.png'
  }
]
export const GROUP_BUY_PLATFORM_TEXT = [
  {
    label: '抖音',
    value: '抖音',
    icon: 'tiktok.png'
  },
  {
    label: '美团',
    value: '美团',
    icon: 'meituan.png'
  },
  {
    label: '大众点评',
    value: '大众点评',
    icon: 'rabbr.png'
  },
  {
    label: '其他',
    value: '其他',
    icon: 'custom.png'
  }
]
export const GROUP_BUY_PLATFORM_SECOND_OPTIONS = [
  {
    label: '美食、酒店（仅参与团购的商品）',
    value: 1
  },
  {
    label: '足浴',
    value: 2
  },
  {
    label: 'KTV',
    value: 3
  },
  {
    label: '剧本杀',
    value: 4
  }
]
export const COLLECTION_STATUS = [
  { label: "已收录", value: "collected" },
  { label: "未收录", value: "uncollected" },
  { label: "待反馈", value: "processing" }
]

export const PUBLISH_STATUS = [
  { label: "已发布", value: "published" },
  { label: "未发布", value: "unpublished" },
]

export const MATERIAL_TYPE = [
  { label: "图片", value: "image" },
  { label: "视频", value: "video" },
]

export const STICKER_STATUS = [
  { label: "正常", value: false, color: "#222428" },
  { label: "禁用", value: true, color: "#A3A5AB" },
]