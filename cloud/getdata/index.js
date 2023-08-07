// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 查询数据库
  // 1. 查询数据库中对应昵称的用户,昵称对应数据库中的买家字段
  // 2. 返回结果

  const db = cloud.database()
  const _ = db.command
  const nickname = event.nickname
  const result = await db.collection('user_tree').where({
    买家: nickname
  }).get()
  
  // 种子用户字段和裂变用户字段为字符串，需要转换为列表，去掉首尾的引号，以逗号分隔
  var seed_user = result.data[0].种子用户
  var multi_user = result.data[0].裂变用户
  
  // 统计销量，销量为交易状态为支付成功的订单的数量减去已退款的订单的数量
  var sales = result.data[0].销量
  var sales_success = await db.collection('storeinfo').where({
    买家: nickname,
    交易状态: "支付成功"
  }).count()
  var sales_refund = await db.collection('storeinfo').where({
    买家: nickname,
    交易状态: "已退款"
  }).count()

  sales = sales_success.total - sales_refund.total
  seed_user = seed_user.substring(0, seed_user.length ).split(",")
  multi_user = multi_user.substring(0, multi_user.length ).split(",")
  console.log("seed_user", seed_user)

  // 下单人数，下单人数为该用户的种子用户中，交易状态为支付成功的订单的数量减去已退款的订单的数量
  var order_num = 0
  for (var i = 0; i < seed_user.length; i++) {
    var order_success = await db.collection('storeinfo').where({
      买家: seed_user[i],
      交易状态: "支付成功"
    }).count()
    var order_refund = await db.collection('storeinfo').where({
      买家: seed_user[i],
      交易状态: "已退款"
    }).count()
    order_num += order_success.total - order_refund.total
  }

  // 对seed_user去重
  seed_user = Array.from(new Set(seed_user))

  // 统计返回条数
  var need_to_process = seed_user.length

  // 返回结果
  return {
    result: result,
    seed_user: seed_user,
    multi_user: multi_user,
    sales: sales,
    order_num: order_num,
    need_to_process: need_to_process
  }
}