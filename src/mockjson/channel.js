export const channelList = [
  {
    id: 1,
    defaultIcon: "red-book.png",
    defaultName: "发小红书",
    showIcon: "",
    showName: "发小红书",
    type: "red-book",
    actionType: 'send',
    targetTextDefault: '发小红书',
    targetText: '发小红书',
  },
  {
    id: 2,
    defaultIcon: "red-book.png",
    defaultName: "关注小红书",
    showIcon: "",
    showName: "关注小红书",
    type: "red-book",
    actionType: 'follow'
  },
  {
    id: 3,
    defaultIcon: "rabbr.png",
    defaultName: "点评评价",
    showIcon: "",
    showName: "点评评价",
    type: "rabbr",
    actionType: 'evaluate',
    targetTextDefault: '复制并打开点评',
    targetText: '复制并打开点评',
  },
  {
    id: 4,
    defaultIcon: "rabbr.png",
    defaultName: "打卡&收藏",
    showIcon: "",
    showName: "打卡&收藏",
    type: "rabbr",
    actionType: 'follow'
  },
  {
    id: 5,
    defaultIcon: "rabbr.png",
    defaultName: "点评团购",
    showIcon: "",
    showName: "点评团购",
    type: "rabbr",
    actionType: 'group_buy'
  },
  {
    id: 6,
    defaultIcon: "meituan.png",
    defaultName: "美团评价",
    showIcon: "",
    showName: "美团评价",
    type: "meituan",
    actionType: 'evaluate'
  },
  {
    id: 7,
    defaultIcon: "meituan.png",
    defaultName: "美团团购",
    showIcon: "",
    showName: "美团团购",
    type: "meituan",
    actionType: 'group_buy'
  },
  {
    id: 8,
    defaultIcon: "tiktok.png",
    defaultName: "抖音评价",
    showIcon: "",
    showName: "抖音评价",
    type: "tiktok",
    actionType: 'evaluate'
  },
  {
    id: 9,
    defaultIcon: "tiktok.png",
    defaultName: "关注抖音",
    showIcon: "",
    showName: "关注抖音",
    type: "tiktok",
    actionType: 'follow'
  },
  {
    id: 10,
    defaultIcon: "tiktok.png",
    defaultName: "发抖音",
    showIcon: "",
    showName: "发抖音",
    type: "tiktok",
    actionType: 'send',
    disabled: true
  },
  {
    id: 9,
    defaultIcon: "tiktok.png",
    defaultName: "抖音团购",
    showIcon: "",
    showName: "抖音团购",
    type: "tiktok",
    actionType: 'group_buy'
  },
  {
    id: 10,
    defaultIcon: "wechat.png",
    defaultName: "加微信",
    showIcon: "",
    showName: "加微信",
    type: "wechat",
    actionType: 'add'
  },
  {
    id: 11,
    defaultIcon: "wechat-video.png",
    defaultName: "视频号",
    showIcon: "",
    showName: "视频号",
    type: "wechat",
    actionType: 'follow'
  },
  {
    id: 12,
    defaultIcon: "wechat-group.png",
    defaultName: "加微信群",
    showIcon: "",
    showName: "加微信群",
    type: "wechat",
    actionType: 'add-group'
  },
  {
    id: 13,
    defaultIcon: "wechat-send.png",
    defaultName: "发朋友圈",
    showIcon: "",
    showName: "发朋友圈",
    type: "wechat",
    actionType: 'send'
  },
  {
    id: 14,
    defaultIcon: "fly-pig.png",
    defaultName: "飞猪评价",
    showIcon: "",
    showName: "飞猪评价",
    type: "fly-big",
    actionType: 'evaluate',
    disabled: true
  },
  {
    id: 15,
    defaultIcon: "ctrip.png",
    defaultName: "携程评价",
    showIcon: "",
    showName: "携程评价",
    type: "ctrip",
    actionType: 'evaluate',
    disabled: true
  },
  {
    id: 16,
    defaultIcon: "order.png",
    defaultName: "线上点单",
    showIcon: "",
    showName: "线上点单",
    type: "order",
    actionType: 'order',
    orderList: [
      {
        id: 1,
        targetType: 'url',
        targetName: '1号包厢',
        targetUrl: 'https://www.baidu.com'
      },
      {
        id: 2,
        targetType: 'image',
        targetName: '2号包厢',
        targetImage: ['https://www.baidu.com']
      },
      {
        id: 3,
        targetType: 'miniprogram',
        targetName: '3号包厢',
        targetMiniprogram: 'wx1234567890',
        targetMiniprogramPath: 'pages/index/index',
        targetMiniprogramSecret: '1234567890'
      }
    ]
  },
  {
    id: 17,
    defaultIcon: "wifi.png",
    defaultName: "连WIFI",
    showIcon: "",
    showName: "连WIFI",
    type: "wifi",
    actionType: 'wifi'
  },
  {
    id: 18,
    defaultIcon: "vip.png",
    defaultName: "出示会员",
    showIcon: "",
    showName: "出示会员",
    type: "vip",
    actionType: 'custom'
  },
  {
    id: 19,
    defaultIcon: "kwai.png",
    defaultName: "关注快手",
    showIcon: "",
    showName: "关注快手",
    type: "kwai",
    actionType: 'follow'
  },
  {
    id: 20,
    defaultIcon: "kwai.png",
    defaultName: "发快手",
    showIcon: "",
    showName: "发快手",
    type: "kwai",
    actionType: 'send',
    disabled: true
  },
]

export const promptList = [
  {
    id: 1,
    name: "提示词1",
  },
  {
    id: 2,
    name: "提示词2",
  },
  {
    id: 3,
    name: "提示词3",
  },
]
export const defaultFormData = {
  "color": "#000000",
  "banner": [
      {
        "banner_url": "https://img1.baidu.com/it/u=3654298861,3467786631&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
        "jump_url": ""
      },
      {
        "banner_url": "https://img1.baidu.com/it/u=937072411,472582291&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
        "jump_url": ""
      },
      {
        "banner_url": "https://img1.baidu.com/it/u=1643311103,2411339586&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        "jump_url": ""
      }
  ],
  "interval": 3000,
  "group": [
      {
          "channelList": [
              {
                  "channel": "red_post",
                  "channel_id": 16,
                  "display_name": "发小红书",
                  "display_logo_url": "red-book.png"
              }
          ],
          "title": "新增分组",
          "id": "a2zrf3oagrc1751443793705"
      },
      {
          "channelList": [
              {
                  "channel": "dianping_comment",
                  "channel_id": 18,
                  "display_name": "点评评价",
                  "display_logo_url": "rabbr.png"
              }
          ],
          "title": "新增分组",
          "id": "62ypt3p2bs31751443800079"
      }
  ],
  "bgImage": [
      "https://img1.baidu.com/it/u=1113246343,2934623416&fm=253&fmt=auto?w=616&h=1280"
  ],
  "groupBuy": [
      {
          "name": "ss",
          "platform": "tiktok",
          "type": "",
          "link": "1323",
          "originalPrice": 21,
          "currentPrice": 1,
          "tag": [
              "tetx",
              "22"
          ],
          "sold": 11,
          "id": "htu2be6tsm51750762265339"
      },
      {
          "name": "11",
          "platform": "meituan",
          "type": 1,
          "link": "11",
          "tag": [],
          "id": "rg8o7mugpb1750762277650"
      }
  ]
}