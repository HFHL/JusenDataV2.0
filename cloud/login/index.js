// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  // 1. 获取数据库引用
  const db = cloud.database()
  const tel = event.tel
  const password = event.password
  

  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。
  // get 方法会触发网络请求，往数据库取数据
  const result = await db.collection('user').where({
    tel: tel,
    password: password
  }).get()

  // 3. 返回数据给调用方
  return result.data
}