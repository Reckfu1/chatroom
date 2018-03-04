import user from '../models/user.js'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

const registerAccount=async ctx => {
    // koa-bodyparser已经把数据解析到ctx.request.body中
    const {user_temp,password}=ctx.request.body
    const register=await user.insetUser(user_temp,md5(password))
    if(register){
        ctx.body={
            success:true
        }
    }
    else {
        ctx.body={
            success:false
        }
    }
}

export default{
    registerAccount
}