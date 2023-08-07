// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (inputcode) => {
  
  // // 获取val_code集合，遍历该集合下的每个记录的code字段，打印出来
  const valcodes = await cloud.database(
    { env: cloud.DYNAMIC_CURRENT_ENV }
  ).collection('val_code').where({
    code: inputcode.inputcode
  }).get()
  console.log("com_code",valcodes.data)

  // 如果存在，返回true
  if (valcodes.data.length > 0) {
    return true
  }
  // 如果不存在，返回false
  else {
    return false
  }
  console.log("inputcode",inputcode)
  
  }