// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: "cloud1-2gccxwd44cc9303b",
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);
    wx.hideHomeButton();

    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
  // 微信云开发初始化
  onShow() {
    
  },
  globalData: {
    user_name: "a",
    company_code: "",
    department_name: "",
    is_admin: true,
    tel: "",
  },
});