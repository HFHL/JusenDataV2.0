// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 传入买家，在clue数据库中做匹配，返回交易状态和全部商品名称字段
  const buyer = event.buyer
  const db = cloud.database()
  const _ = db.command
  const result = await db.collection('clue').where({
    买家: event.buyer
  }).get()
  
  return result
}