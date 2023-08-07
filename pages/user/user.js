// pages/user/user.js
import * as echarts from "../../components/echarts/echarts.min";

Page({
  /**
   * Page initial data
   */
  data: {
    vbindcount: 1,
    bandshow: false,
    department: "部门名",
    username: "用户名",
    active1: 1,
    vbindcount: 1,
    day: 2,
    popupshow: false,
    vbindtime: "2021-01-01 00:00",
    current_open_id: "",
    ec: {
      onInit: initChart,
    },
    vbindlist: [
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
    ],
  },

  onpopupClose() {
    this.setData({
      popupshow: false,
    });
  },

  openlist(){
    this.setData({
      popupshow: true,
    });
  },
  onChange(event) {
    const app = getApp();
    console.log(event.detail);
    const is_admin = getApp().globalData.userPermission;
    if (event.detail == 0) {
      if (app.globalData.is_admin) {
        wx.redirectTo({
          url: "/pages/admin_index/admin_index",
        });
      } else {
        wx.redirectTo({
          url: "/pages/index/index",
        });
      }
    }
  },

  oninputchange(e) {
    this.setData({
      inputnickname: e.detail,
    });
    console.log("input", e.detail);
  },
  

  // 获取当前时间，并格式化为xxxx-xx-xx
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1; //月份是从0开始的
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minute < 10) {
      minute = "0" + minute;
    }

    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }

    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }

    var currentdate =
      year +
      seperator1 +
      month +
      seperator1 +
      strDate +
      " " +
      hour +
      ":" +
      minute;
    this.setData({
      vbindtime: currentdate,
    });
    return currentdate;
  },
  addbind: function (e) {
    console.log("nickname", this.data.inputnickname);
    var vbindlist = this.data.vbindlist;
    vbindlist.push({
      avatar_url: "https://img.yzcdn.cn/vant/cat.jpeg",
      nickName: this.data.inputnickname,
    });
    this.setData({
      vbindlist: vbindlist,
      vbindcount: this.data.vbindcount + 1,
    });
    this.setData({
      bandshow: false,
    });
    console.log("thisinputnickname", this.data.inputnickname);

    
    // 点击绑定后调用微信登录，获取用户信息
    wx.login({
      success: (res) => {
        // wx.request发送code
        wx.request({
          url: "https://api.weixin.qq.com/sns/jscode2session",
          data: {
            appid: "wx4da720fbfaa556e4",
            secret: "411d963d337368c8bd0680fab92517e7",
            js_code: res.code,
            grant_type: "authorization_code",
          },
          success: (res) => {
            console.log("res", res);
            // 获取到用户的openid
            var openid = res.data.openid;
            
            // 获取到用户的session_key
            var session_key = res.data.session_key;

            console.log("openid", openid);
           
            console.log("session_key", session_key);
            this.setData({
              current_open_id: openid,
            });
          },
        });
        },
    });
  },
  
  addchat: function () {
    this.setData({
      bandshow: true,
    });
  },

  onbindClose() {
    this.setData({
      bandshow: false,
    });
  },

  onClose() {
    this.setData({
      show: false,
    });
  },

  onSetting() {
    wx.navigateTo({
      url: "/pages/setting/setting",
    });
  },
  

  /**
   * Lifecycle function--Called when page load
   */

  onLoad(options) {

    // 设置当前页面的标题
    wx.setNavigationBarTitle({
      title: "个人中心",
    });
    // 设置标题的背景颜色
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#5ec452",
    });

    // 分享到朋友圈或群聊
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });


    const app = getApp();
    console.log("user_name", app.globalData.user_name);
    console.log("userPermission", app.globalData.is_admin);
    console.log("company_code", app.globalData.company_code);
    console.log("department_name", app.globalData.department_name);
    console.log("tel", app.globalData.tel);

    // 每分钟刷新
    setInterval(() => {
      this.getNowFormatDate();
    }, 60000);

    wx.hideHomeButton();
    this.getNowFormatDate();

    this.setData({
      username: app.globalData.user_name,
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

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // 像素
  });
  canvas.setChart(chart);

  var option = {
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        color: ["#1EFF3C", "#FFDA1E", "#FF1E1E"],
        itemStyle: {
          borderRadius: 3,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 10,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [{ value: 12 }, { value: 18 }, { value: 6 }],
      },
    ],
  };
  chart.setOption(option);
  return chart;
}
