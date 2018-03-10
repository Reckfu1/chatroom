import user from '../models/user.js'
import md5 from 'md5'
import jwt from 'jsonwebtoken'

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
    console.log(`result is:${result}`)

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
    let verifyInfo={}

    // 验证token，若有错误，返回false,如果正确，进行下一步验证
    jwt.verify(token,'chatroom',(err,decoded) => {
        if(err){
            ctx.body={
                verify:false
            }
        }
        else{
            // 将token解析结果赋值给变量
            verifyInfo=decoded
            ctx.body={
                verify:true
            }
        }
    })

    return verifyInfo
    // const findUser=await user.getUserByName(verifyInfo.name)
    // if(findUser!=null){
    //     if(findUser.user_password==verifyInfo.password){
    //         ctx.body={
    //             verify:true
    //         }
    //     }
    //     else{
    //         ctx.body={
    //             verify:false
    //         }
    //     }
    // }
    // else{
    //     ctx.body={
    //         verify:false
    //     }
    // }
}

// 验证用户并修改信息
const modifyInfo=async ctx => {
    const {value,token}=ctx.request.body
    let verifyInfo={}

    // 这里箭头函数也加async的原因是箭头函数中有异步操作，函数名前要加async，不然await会是一个保留字 
    jwt.verify(token,'chatroom',async (err,decoded) => {
        // 验证不通过
        if(err){
            ctx.body={
                modify_result:false
            }
        }
        // 验证通过
        else{
            verifyInfo=decoded
            console.log(`${verifyInfo.name} and ${value.sex_value} ${value.pro_value} ${value.hobby_value}`)
            const modify=await user.modifyUserInfo(verifyInfo.name,value)
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
    })
}

// 上传图片
const uploadImg=async ctx => {
    ctx.body={
        mes:'upload success'
    }
}

export default{
    registerAccount,
    loginAccount,
    verifyAccount,
    uploadImg,
    modifyInfo
}