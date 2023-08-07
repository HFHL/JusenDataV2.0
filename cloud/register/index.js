// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event,context) => {

  // 获取前端传来的参数
  const user_name = event.user_name
  const password = event.password
  const com_code = event.com_code
  const tel = event.tel
  const is_admin = event.is_admin
  const department_name = event.department_name
  
  // 查询user集合，遍历该集合下的每个记录的tel字段，打印出来，与前端传来的tel比较，如果相同，返回false，如果不同，返回true
  const users = await cloud.database(
    { env: cloud.DYNAMIC_CURRENT_ENV }
  ).collection('user').where({
    tel: tel
  }).get()
  console.log("users",users.data)


  // 如果存在，返回false
  if (users.data.length > 0) {
    return false
  }
  
  // 如果不存在，返回true
  else {
    // 查询val_code集合中的code与前端传来的com_code相同的记录，如果该记录的space字段为0，返回false，如果不为0，返回true
    const val_codes = await cloud.database(
      { env: cloud.DYNAMIC_CURRENT_ENV }
    ).collection('val_code').where({
      code: com_code
    }).get()
    console.log("val_codes",val_codes.data)
    if (val_codes.data[0].space == 0) {
      return false
    }
    // 在user集合中添加一条记录
    await cloud.database(
      { env: cloud.DYNAMIC_CURRENT_ENV }
    ).collection('user').add({
      data: {
        user_name: user_name,
        password: password,
        com_code: com_code,
        tel: tel,
        is_admin: is_admin,
        department_name: department_name,
        // 在bind列表中添加一条记录，以user_name为value
        bind: [user_name]
      }
    })
    
    // 查询val_code中code与前端传来的com_code相同的记录，并将该记录的space字段-1
    const val_code = await cloud.database(
      { env: cloud.DYNAMIC_CURRENT_ENV }
    ).collection('val_code').where({
      code: com_code
    }).get()
    console.log("val_code",val_code.data)
    await cloud.database(
      { env: cloud.DYNAMIC_CURRENT_ENV }
    ).collection('val_code').doc(val_code.data[0]._id).update({
      data: {
        space: val_code.data[0].space - 1
      }
    })
    return true
  }
  


  





  
}