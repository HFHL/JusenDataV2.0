// index.js
// 获取应用实例
const app = getApp();

Page({
  data: {
    active1: 0,
    //合作商
    parterner: "西财天府",
    //部门
    department: "宣传部",
    //姓名
    name: "小王",
    // 当前界面显示的信息
    all_user_count: 0, // 全部用户数
    seed_user_count: 0, // 种子用户数
    invite_goal: 300, // 邀请目标
    fission_count: 0, // 裂变次数
    need_invite_count: 0, // 还需邀请人数
    goal_is_achieved: "未完成", // 是否达成邀请目标
    bouns: 0, // 奖金
    personal_GMV: 0, // 个人GMV
    sale_count: 0, // 销售数量
    order_num: 13, // 下单人数
    seed_user: [], // 种子用户列表
    popupshow: false,
    current_user_clue: "",
    need_to_process: 0, //待办数量

    // 当前登录用户的信息
    userinfo: {
      _id: "",
      user_name: "",
      com_code: "",
      department_name: "",
      is_admin: false,
      tel: "",
    },

    
    seed_List: [],
  },


  onClose() {
    this.setData({ popupshow: false });
  },


  onReady() {},

  makePhoneCall: function (event) {
    let tel = String(event.currentTarget.dataset.phone);

    wx.makePhoneCall({
      phoneNumber: tel,
    });
    console.log("current phone number is", event);
  },

  onChange(e) {
    this.setData({
      active1: e.detail,
    });
    if (e.detail == 1) {
      wx.redirectTo({
        url: "/pages/user/user",
      });
    }
  },

  onItemClick: function (e) {
    const index = e.target.dataset.index; // 获取点击的列表项索引
    console.log("Clicked item with index", index);
    const clickedText = this.data.seed_List[index][0]; // 获取对应索引的文本内容
    console.log("Clicked item text is", clickedText);
    
    wx.request({
      url: "https://flask-uj41-60441-10-1319187690.sh.run.tcloudbase.com/clue_detail/"+clickedText,
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        console.log("detail",result.data);
        this.setData({
          current_user_clue: result.data.buyer,
        });
      },
      complete: () => {
        console.log("completed current user clue", this.data.current_user_clue);
      },

    });

    this.setData({
      popupshow: true,
    });
  
  },
  // 点击删除按钮，删除对应的clue记录
  removeitem: function (e) {
    // 获取当前列表的索引，找到对应的_id
    const index = e; // 获取点击的列表项索引
    console.log("Clicked item with index", e);
  },

  onpopupClose() {
    this.setData({
      popupshow: false,
    });
  },

  copyname(event) {
    const name = String(event.currentTarget.dataset.nickname);
    wx.setClipboardData({
      data: name,
      success: function (res) {
        wx.showToast({
          title: "复制成功",
          icon: "success",
          duration: 1000,
        });
      },
    });
    console.log("copied name is", event);
  },

  // getListLength() {
  //   const length = this.data.seed_List.length;
  //   this.setData({
  //     need_to_process: length,
  //   });
  // },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"],
    });


    // 设置当前页面的标题
    wx.setNavigationBarTitle({
      title: "首页",
    });
    // 设置标题的背景颜色
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#5ec452",
    });

    // 打印当前登录用户信息
    console.log("current user info", getApp().globalData.user_name);
    // setInterval(this.getListLength, 1000);

    // 将getApp().globalData.user_name用ISO-8859-1编码

    const encode_name = encodeURI(getApp().globalData.user_name);

    wx.request({
      url: "https://flask-uj41-60441-10-1319187690.sh.run.tcloudbase.com/index/" + encode_name,
      data: {},
      header: { "content-type": "application/json" },
      method: "GET",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        console.log("res", result);
        this.setData({
          all_user_count: result.data.fission.all_count,
          seed_user_count: result.data.fission.seed_count,
          fission_count: result.data.fission.fission_count,
          personal_GMV: result.data.gmv.gmv,
          sale_count: result.data.sales.sales,
          order_num: result.data.order.order,
          // 将clue.buyer map到seed_List中
          seed_List: result.data.clue.buyer,
          need_to_process: result.data.clue.buyer.length,
        });
      },
      
    });

    // wx.cloud.callContainer({
    //   "config": {
    //     "env": "prod-4grzetih6c861d27"
    //   },
    //   "path": "/index/" + encode_name,
    //   "header": {
    //     "X-WX-SERVICE": "flask-uj41",
    //     "content-type": "application/json"
    //   },
    //   "method": "GET",
    //   "data": ""
    // }).then((res) => {
    //   console.log("res", res);
    //   this.setData({
    //     all_user_count: res.result.fission.all_count,
    //     seed_user_count: res.result.fission.seed_count,
    //     fission_count: res.result.fission.fission_count,
    //     personal_GMV: res.result.gmv.gmv,
    //     sale_count: res.result.sales.sales,
    //     order_num: res.result.order.order,
    //     // 将clue.buyer map到seed_List中
    //     seed_List: res.result.clue.buyer,
    //     need_to_process: res.result.clue.buyer.length,
    //   });
    // })


    wx.hideHomeButton();
    // 调用云函数，获取app.js中的globalData，并赋值给data中的userinfo
    // wx.cloud.callFunction({
    //   name: "getdata",
    //   data: {
    //     nickname: getApp().globalData.user_name,
    //   },
    //   success: (res) => {
    //     console.log("current_user", res.result);
    //     this.setData({
    //       all_user_count:
    //         res.result.seed_user.length + res.result.multi_user.length,
    //       seed_user_count: res.result.seed_user.length,
    //       fission_count: res.result.multi_user.length,
    //       need_invite_count:
    //         this.data.invite_goal -
    //         res.result.seed_user.length -
    //         res.result.multi_user.length,
    //       goal_is_achieved:
    //         this.data.invite_goal -
    //           res.result.seed_user.length -
    //           res.result.multi_user.length <=
    //         0
    //           ? "已完成"
    //           : "未完成",
    //       personal_GMV: res.result.result.data[0].订单总金额,
    //       sale_count: res.result.sales,
    //       order_num: res.result.order_num,
    //       // res.result.seed_user是一个object对象，把它转为数组并赋值给seed_user
    //       seed_user: res.result.seed_user,

    //       // 创建一个array
    //       // seed_List: res.result.seed_user.map((item) => {
    //       //   return {
    //       //     username: item,
    //       //     isSeed: true,

    //       //   }
    //       // }
    //       // )
    //     });
    //     console.log("种子用户列表11", typeof res.result.seed_user);
    //     console.log("种子用户列表fromdata", this.data.seed_user);

    //     var seedlist = [];
    //     for (var i in res.result.seed_user) {
    //       seedlist.push(res.result.seed_user[i]);
    //     }

    //     // 调用云函数
    //     wx.cloud
    //       .callFunction({
    //         name: "getclue",
    //       })
    //       .then((res) => {
    //         console.log("res", res);
    //         this.setData({
    //           // 渲染种子用户列表
    //           seed_List: res.result.data.map((item) => {
    //             return {
    //               username: item.买家,
    //               productname: item.全部商品名称,
    //               dealstatus: item.交易状态,
    //               tel: item.联系电话,
    //             };
    //           }),
    //         });
    //       });
    //   },
    // });
  },
});