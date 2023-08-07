// pages/admin_index/admin_index.js
Page({

  /**
   * Page initial data
   */
  data: {
    active:0,
    active1:0,
    detail_list : [{
      index:0,
      img:'https://img.yzcdn.cn/vant/cat.jpeg',
      username:"和风海林",
      all_invite:100,
      seed_count:60,
      fission_count:40
    },
    {
      index:1,
      img:'https://img.yzcdn.cn/vant/cat.jpeg',
      username:"丁涛",
      all_invite:300,
      seed_count:70,
      fission_count:230
    },
    {
      index:2,
      img:'https://img.yzcdn.cn/vant/cat.jpeg',
      username:"向天笑",
      all_invite:300,
      seed_count:70,
      fission_count:230
    },
    {
      index:3,
      img:'https://img.yzcdn.cn/vant/cat.jpeg',
      username:"朱文毅",
      all_invite:300,
      seed_count:70,
      fission_count:230
    },
    {
      index:4,
      img:'https://img.yzcdn.cn/vant/cat.jpeg',
      username:"宇智波斑",
      all_invite:300,
      seed_count:70,
      fission_count:230
    }
  ],
  opts: {
    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
    padding: [15,15,0,15],
    enableScroll: false,
    legend: {},
    xAxis: {
      disableGrid: true,
      title: ""
    },
    yAxis: {
      disabled: false,
      disableGrid: false,
      splitNumber: 5,
      gridType: "dash",
      dashLength: 4,
      gridColor: "#CCCCCC",
      padding: 10,
      showTitle: true,
      data: [
        {
          position: "left",
          title: "邀请数量"
        },
        // {
        //   position: "right",
        //   min: 0,
        //   max: 200,
        //   title: "柱状图",
        //   textAlign: "left"
        // },
        // {
        //   position: "right",
        //   min: 0,
        //   max: 200,
        //   title: "点",
        //   textAlign: "left"
        // }
      ]
    },
    extra: {
      mix: {
        column: {
          width: 20
        }
      }
    }
  },

  opts2: {
    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
    padding: [15,15,0,15],
    enableScroll: false,
    legend: {},
    xAxis: {
      disableGrid: true,
      title: ""
    },
    yAxis: {
      disabled: false,
      disableGrid: false,
      splitNumber: 5,
      gridType: "dash",
      dashLength: 4,
      gridColor: "#CCCCCC",
      padding: 10,
      showTitle: true,
      data: [
        {
          position: "left",
          title: "GMV"
        },
        // {
        //   position: "right",
        //   min: 0,
        //   max: 200,
        //   title: "柱状图",
        //   textAlign: "left"
        // },
        // {
        //   position: "right",
        //   min: 0,
        //   max: 200,
        //   title: "点",
        //   textAlign: "left"
        // }
      ]
    },
    extra: {
      mix: {
        column: {
          width: 20
        }
      }
    }
  },
  
  },

  onChange(event) {
    // 点击标签页
    console.log(event.detail)
    if(event.detail==1){
      wx.redirectTo({
        url: '/pages/user/user',
      })
    }
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    wx.hideHomeButton()

    wx.cloud.callContainer({
      "config": {
        "env": "prod-4grzetih6c861d27"
      },
      "path": "/",
      "header": {
        "X-WX-SERVICE": "jusenapi"
      },
      "method": "GET",
      "data": {
        "action": "inc"
      }
    }).then(res => {
      console.log(res.data)
    })
  },



  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    this.getServerData();
  },

  getServerData() {
    //模拟从服务器获取数据时的延时
    
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
          categories: ["07-23", "07-24", "07-25", "07-26", "07-27", "07-28"],
          series: [
            {
              name: "当前总人数",
              type: "area",
              style: "curve",
              data: [80, 100, 111,163,180,200],
           
            },
            {
              name: "每日增长量",
              type: "line",
              style: "curve",
              color: "#2ecc71",
              disableLegend: true,
              data: [30,20,11,52,17,20]
            },
            
            
          ]
        };
      this.setData({ chartData: JSON.parse(JSON.stringify(res)) });

      let res2 = {
        categories: ["07-23", "07-24", "07-25", "07-26", "07-27", "07-28"],
          series: [
            {
              name: "当前总GMV",
              type: "area",
              style: "curve",
              color:"#de6ded",
              data: [20000, 25000, 32000,33000,34000,36000],
           
            },
            {
              name: "每日增长量",
              type: "line",
              style: "curve",
              color: "#ede32d",
              disableLegend: true,
              data: [200,5000,7000,1000,1000,2000]
            },
            
            
          ]
        };
      this.setData({ chartData2: JSON.parse(JSON.stringify(res2)) });
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