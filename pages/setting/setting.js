// pages/setting/setting.js
Page({
  
  /**
   * Page initial data
   */
  data: {
    vbindcount :1,
    focus: false,
    bandshow: false,
    inputnickname: '',
    show: false,
    departmentName: '',
    departments: ['部门A', '部门B', '部门C'],
    username: 'username',
    tel: '131',
    pass1: '123',
    pass2: '123',
    vbindlist : [
      // {
      //   avatar_url : 'https://img.yzcdn.cn/vant/cat.jpeg',
      //   nickName : '蔡徐坤',
      // },
      // {
      //   avatar_url : 'https://img.yzcdn.cn/vant/cat.jpeg',
      //   nickName : '陈立农',
      // },
      // {
      //   avatar_url : 'https://img.yzcdn.cn/vant/cat.jpeg',
      //   nickName : '范丞丞',
      // }
    ]
  },

  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;

  },
  focus(e){
    console.log(e)
  },
  lossfocus(e){
    console.log("loss",e)
    // 使输入框获得焦点

  },
  handlenicknamechange(nickname){
    console.log("nickname",nickname.detail)
    this.setData({inputnickname:nickname.detail})
  },
  getnickname(e){
    console.log("nickname",e.detail)
    this.setData({inputnickname:e.detail})
  },

  addbind:function(){
    console.log("nickname",this.data.inputnickname)
    var vbindlist = this.data.vbindlist;
    vbindlist.push({
      avatar_url : 'https://img.yzcdn.cn/vant/cat.jpeg',
      nickName : this.data.inputnickname,
    })
    this.setData({
      vbindlist:vbindlist,
      vbindcount : this.data.vbindcount + 1
    })
    this.setData({
      bandshow: false
    })
    console.log(this.data.vbindlist)
    
    // 调用云函数
    wx.cloud.callFunction({
      name: 'getnickname',
      data: {
        tel: this.data.tel,
        nickname: this.data.inputnickname
      },
      success: res => {
        console.log("云函数调用成功", res)
      }
    })

  },
  addchat:function(){
    this.setData({
      bandshow: true
    })

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

  delbind(e){
    var index = e.currentTarget.dataset.index;
    var vbindlist = this.data.vbindlist;
    vbindlist.splice(index,1);
    this.setData({
      vbindlist:vbindlist,
      vbindcount : this.data.vbindcount - 1
    })
  },
  onCancel() {
    this.setData({
      show: false
    })
  },

  showPopup() {
    this.setData({
      show: true
    });
    console.log("hh")
  },
  onbindClose() {
    this.setData({
      bandshow: false
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },

  handleInputChange1(e){
    this.setData({username:e.detail})
  },
  handleInputChange2(e){
    this.setData({tel:e.detail})
  },
  handleInputChange3(e){
    this.setData({pass1:e.detail})
  },
  handleInputChange4(e){
    this.setData({pass2:e.detail})
  },

  sign_out(){
    const app = getApp()
    app.globalData.userPermission = 'admin',
    app.globalData.user_name = '',
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const app = getApp()
    this.setData({
      username:app.globalData.user_name
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