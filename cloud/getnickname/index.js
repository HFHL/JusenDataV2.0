// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 传入一个nickname，和tel，查询数据库中对应tel的用户，数据库中的nickname是一个列表，将nickname添加到列表中
  //
  // 1. 查询数据库中对应tel的用户
  // 2. 将nickname添加到列表中
  // 3. 更新数据库
  // 4. 返回结果
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const tel = event.tel
  const nickname = event.nickname
  const result = await db.collection('user').where({
    tel: tel
  }).get()
  console.log("result", result)
  // 插入数据
  const res = await db.collection('user').doc(result.data[0]._id).update({
    data: {
      nickname: _.push(nickname)
    },
  })
  console.log("res", res)
  
  // 返回nickname列表中的第一个元素
  return {
    nickname: nickname
  }
}