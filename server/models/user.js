import db from '../config/db.js'
// 引入user表结构
const userModel='../schema/user.js'
// 引入数据库
const ChatroomDb=db.Chatroom
// 用sequelize的import方法引入表结构，实例化User
const User=ChatroomDb.import(userModel)

const insetUser=async (user,password) => {
    const registerInfo=await User.create({
        user_name:user,
        user_password:password
    })
    return true
}

export default{
    insetUser
}