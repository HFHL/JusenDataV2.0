// pages/login/login.js
Page({
  /**
   * Page initial data
   */
  data: {
    account: "",
    password: "",
  },
  onAccount_Change(event) {
    this.setData({
      account: event.detail,
    });
    console.log("账号：", this.data.account);
  },

  getUserProfile(e) {
    
  },

  

  onPassword_Change(event) {
    this.setData({
      password: event.detail,
    });
    console.log("密码：", this.data.password);
  },
  formsubmit() {
    const nickName = e.detail.value.nickname;
    console.log("nickName", nickName);
  },

  handleLogin: function () {
    // 判空
    if (this.data.account == "" || this.data.password == "") {
      wx.showToast({
        title: "请填写完整信息",
        icon: "none",
        duration: 2000, // 可选参数，持续时间（毫秒），默认为 1500
      });
      return;
    }

    // 调用云函数
    wx.cloud.callFunction({
      name: "login",
      data: {
        tel: this.data.account,
        password: this.data.password
      },
      success: (res) => {
        console.log(res.result); // 3
        if (res.result.length == 0) {
          console.log("账号或密码错误");
          wx.showToast({
            title: "账号或密码错误",
            icon: "none",
            duration: 2000, // 可选参数，持续时间（毫秒），默认为 1500
          });
        } else {
          console.log("登录成功",res);
          const app = getApp();
          // 全局变量赋值
          
          
          app.globalData.is_admin = res.result[0].is_admin;
          app.globalData.user_name = res.result[0].user_name;
          app.globalData.company_code = res.result[0].com_code;
          app.globalData.department_name = res.result[0].department_name;
          app.globalData.tel = res.result[0].tel;
          console.log("globalData", res.result[0].user_name);
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 2000, // 可选参数，持续时间（毫秒），默认为 1500
          });
          // 调用云函数getdata
          wx.cloud.callFunction({
            name: "getdata",
            complete: (res) => {
              console.log("callFunction test result: ", res);
            }
          });
          // 判断是否为管理员，若是则跳转到admin_index，否则跳转到index
          if (res.result[0].is_admin) {
            console.log("userPermission", getApp().globalData.is_admin);
            setTimeout(function () {
              wx.reLaunch({
                url: "/pages/admin_index/admin_index",
              });
            }, 1000);
          } else {
            console.log("userPermission", getApp().globalData.is_admin);
            setTimeout(function () {
              wx.reLaunch({
                url: "/pages/index/index",
              });
            }, 1000);
          }
        }
      },
      fail: (err) => {
        console.log(err);
      },
    });
  },
  
  toval() {
    wx.navigateTo({
      url: "/pages/val/val",
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    
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
