export default defineAppConfig({
  pages: ["pages/mine/index", "pages/index/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black"
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/tabbar/首页.png",
        selectedIconPath: "./assets/tabbar/首页-选中.png"
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: "./assets/tabbar/我的.png",
        selectedIconPath: "./assets/tabbar/我的-选中.png"
      }
    ]
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示" // 高速公路行驶持续后台定位
    }
  },
  requiredPrivateInfos: [
    "getLocation",
    "onLocationChange",
    "startLocationUpdateBackground",
    "chooseAddress"
  ]
});
