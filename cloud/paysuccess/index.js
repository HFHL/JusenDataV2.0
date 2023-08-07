// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 支付成功函数
  const res = await cloud.cloudPay.queryOrder({
    "subMchId" : "1647599981",
    "outTradeNo" : event.outTradeNo,
    "envId" : "cloud1-2gccxwd44cc9303b",
    "functionName" : "paysuccess",
  })
  return res
  
}