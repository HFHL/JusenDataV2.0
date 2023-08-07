// pages/register/register.js
import Toast from '@vant/weapp/toast/toast';

Page({

  /**
   * Page initial data
   */
  data: {
    
    show: false,
    departmentName: '',
    departments: ['部门A', '部门B', '部门C'],
    username: '',
    tel: '',
    pass1: '',
    pass2: '',
    company_code: '',
  },

  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;

  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      departmentName: value,
      show: false
    })
  },
  onCancel() {
    this.setData({
      show: false
    })
  },

  handleInputChange1(e) {
    this.setData({
      username: e.detail
    })
  },
  handleInputChange2(e) {
    this.setData({
      tel: e.detail
    })
  },
  handleInputChange3(e) {
    this.setData({
      pass1: e.detail
    })
  },
  handleInputChange4(e) {
    this.setData({
      pass2: e.detail
    })
  },


  register() {
    // const toast = Toast.loading({
    //   forbidClick: true,
    //   selector: '#register-selector',
    // });

    console.log(this.data)
    // 判空
    if (this.data.username == "" || this.data.tel == "" || this.data.pass1 == "" || this.data.pass2 == "" || this.data.departmentName == "") {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000 // 可选参数，持续时间（毫秒），默认为 1500
      });
      return;
    }

    
    if (this.data.pass1 == this.data.pass2) {
      // 调用云函数
      wx.cloud.callFunction({
        name: "register",
        data: {
          user_name: this.data.username,
          password: this.data.pass1,
          com_code:getApp().globalData.company_code,
          tel: this.data.tel,
          is_admin: false,
          department_name: this.data.departmentName,
        },
        success: (res) => {
          console.log(res.result); // 3
          if (res.result) {
            console.log("注册成功");
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000 // 可选参数，持续时间（毫秒），默认为 1500
            });
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/login/login',
              })
            }, 1000);
          } else {
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000 // 可选参数，持续时间（毫秒），默认为 1500
            });
          }
        },
        fail: (err) => {
          console.log("注册失败，请联系管理员");
        }
      });
      // 延时执行代码，单位为毫秒
      
    } else {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000 // 可选参数，持续时间（毫秒），默认为 1500
      });
    }
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

  showPopup() {
    this.setData({
      show: true
    });
    console.log("hh")
  },

  onClose() {
    this.setData({
      show: false
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})