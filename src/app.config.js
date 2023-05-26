export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/index',
    'pages/product/index',
    'pages/detail/index',
    'pages/member/index',
    'pages/member/list',
    'pages/mine/index',
    'pages/landing/index',
    'pages/webview/index',
    'pages/active/index',
    'pages/active/detail'
  ],
  subpackages: [
    {
      'root': 'pages/subpages',
      'name': '个人中心',
      'pages': [
        'active/index',
        'active/code',
        'invoice/detail',
        'invoice/index',
        'invoice/open',
        'chapter/index',
        'course/index',
        'course/detail',
        'course/info',
        'rights/index',
        'setting/protocol',
        'user/businessCard',
        'user/edit',
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000000E5',
    selectedColor: '#4F89F0',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/images/tabBar/home.png',
        selectedIconPath: './assets/images/tabBar/home_selected.png'
      },
      {
        pagePath: 'pages/active/index',
        text: '活动',
        iconPath: './assets/images/tabBar/active.png',
        selectedIconPath: './assets/images/tabBar/active_selected.png'
      },
      {
        pagePath: 'pages/member/index',
        text: '会员库',
        iconPath: './assets/images/tabBar/member.png',
        selectedIconPath: './assets/images/tabBar/member_selected.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/images/tabBar/mine.png',
        selectedIconPath: './assets/images/tabBar/mine_selected.png'
      }
    ]
  },
})
