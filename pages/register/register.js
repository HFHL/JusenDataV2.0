// pages/register/register.js
Page({

      /**
       * Page initial data
       */
      data: {
        show : false,
        departmentName: '',
        departments: ['部门A', '部门B', '部门C'],
       
      },

      onChange(event) {
        const { picker, value, index } = event.detail;
        
      },

      onConfirm(event) {
        const {picker , value , index} = event.detail;
        this.setData({
          departmentName:value,
          show:false
        })
        
      },

      onCancel() {
        this.setData({
          show:false
        })
      } ,   

        /**
         * Lifecycle function--Called when page load
         */
        onLoad(options) {

          },

          showPopup() {
            this.setData({ show: true });
            console.log("hh")
          },

          onClose(){
            this.setData({
              show:false
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