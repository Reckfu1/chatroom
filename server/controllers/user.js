import user from '../models/user.js'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

// 封装验证函数
// 除了方便，更重要的原因如下
// 如果不封装，异步操作将会在jwt的回调箭头函数里面执行，使得函数名前要加async，不然await会是一个保留字
// 但是如果加了async 客户端请求的时候会报404，但是接口却能正常访问，数据库也能发生更改
const commonVerifyFunction=function(temp_token){
    let temp_info
    jwt.verify(temp_token,'chatroom',(err,decoded) => {
        if(err){
            return false
        }
        // 解析结果赋值给变量
        temp_info=decoded
    })
    // 返回解析结果
    return temp_info
}

// const register=User.insetUser(user_temp,md5(password))
// console.log(register)
// 注意，上面这种写法是不行的，因为这是个异步IO操作，register得到的是一个Promise对象，因此使用async/await
// 再注意，async函数无论有无返回值，返回的都会是一个被resolve的Promise对象，无返回值：Promise.resolve(undefined)
// async function testAsync() {
//     return "hello async"
// }
// const result = testAsync()
// console.log(result) 

// 注册
const registerAccount=async ctx => {
    // koa-bodyparser已经把数据解析到ctx.request.body中
    const {user_temp,password}=ctx.request.body
    // 先查询数据库有没有同名
    const isDifferent=await user.getUserByName(user_temp)
    // 用户名已存在
    if(isDifferent!=null){ 
        ctx.body={
            success:false,
            mes:'user has already been existed',
            sign:true
        }
    }
    // 注册用户
    else{
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
}

// 登录
const loginAccount=async ctx => {
    const {user_temp,password}=ctx.request.body
    const result=await user.getUserByName(user_temp)

    if(result!=null){
        // 首先验证密码是否错误
        if(result.user_password!=md5(password)){
            ctx.body={
                success:false,
                mes:'password wrong'
            }
        }
        else{
            let userToken={
                name:result.user_name,
                password:result.user_password,
                exp:Math.floor(Date.now()/1000)+(60*60) // Signing a token with 1 hour of expiration
            }
            const secret='chatroom' // 指定密钥，这是之后用来判断token合法性的标志
            const token=jwt.sign(userToken,secret) // 签发token
            ctx.body={
                success:true,
                token
            }
        }
    }
    else{
        ctx.body={
            success:false,
            mes:'user doesn\'t exist'
        }
    }
}

// 验证token(客户端路由跳转)
const verifyAccount=async ctx => {
    const {token}=ctx.request.body

    // 验证token，若有错误，返回false,如果正确，进行下一步验证
    let result=commonVerifyFunction(token)
    if(result){
        ctx.body={
            verify:true
        }
    }
    else{
        ctx.body={
            verify:false
        }
    }
}

// 获取用户信息
const getUserInfo=async ctx => {
    const {token}=ctx.request.body
    let info=commonVerifyFunction(token)
    if(info){
        let result=await user.getUserByName(info.name)
        if(result){
            ctx.body={
                get_userinfo:true,
                result
            }
        }
        else{
            ctx.body={
                get_userinfo:false
            }
        }
    }
}

// 验证用户并修改信息
const modifyInfo=async ctx => {
    const {value,token}=ctx.request.body
    let info=commonVerifyFunction(token)
    if(info){
        const modify=await user.modifyUserInfo(info.name,value)
        if(modify){
            ctx.body={
                modify_result:true
            }
        }
        else{
            ctx.body={
                modify_result:false
            }
        }
    }
}

// 上传图片
const uploadImg=async ctx => {
    const {ava_url,token}=ctx.request.body
    let info=commonVerifyFunction(token)
    if(info){
        const upload=await user.uploadImgUrl(info.name,ava_url)
        if(upload){
            ctx.body={
                upload_result:true
            }
        }
        else{
            ctx.body={
                modify_result:false
            }
        }
    }
}

export default{
    registerAccount,
    loginAccount,
    verifyAccount,
    uploadImg,
    modifyInfo,
    getUserInfo
}