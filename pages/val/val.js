// pages/val/val.js
Page({
  /**
   * Page initial data
   */
  data: {
    val_code: "",
  },

  toRegister() {
    // 调用云函数
    // 判空
    if (this.data.val_code == "") {
      wx.showToast({
        title: "验证码不能为空",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    wx.cloud.callFunction({
      name: "val_comcode",
      data: {
        inputcode: this.data.val_code,
      },
      success: (res) => {
        console.log(res.result); // 3
        if (res.result) {
          console.log("验证码正确");
          // 全局变量赋值
          getApp().globalData.company_code = this.data.val_code;
          // 跳转到注册页面
          wx.navigateTo({
            url: "../register/register",
          });
          
          

        } else {
          wx.showToast({
            title: "验证码错误",
            icon: "none",
            duration: 2000,
          });
        }
      },
      fail: (err) => {
        console.log(err);
      }
    });
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      val_code: event.detail,
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    // 初始化云环境
    wx.cloud.init({
      env: "cloud1-2gccxwd44cc9303b",
    });

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {},

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {},

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {},

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {},

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {},

  /**
   * Called when page reach bottom
   */
  onReachBottom() {},

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {},
});
