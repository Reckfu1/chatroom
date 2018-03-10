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

const getUserByName=async user => {
    const info=await User.findOne({
        where:{
            user_name:user
        }
    })
    return info
}

const modifyUserInfo=async (name,value) => {
    const temp=await User.update({
        user_sex:value.sex_value,
        user_profession:value.pro_value,
        user_hobby:value.hobby_value
    },{
        where:{
            user_name:name
        }
    })

    return true
}

export default{
    insetUser,
    getUserByName,
    modifyUserInfo
}