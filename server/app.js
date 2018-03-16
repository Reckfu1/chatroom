import koa from 'koa'
import koaRouter from 'koa-router'
import json from 'koa-json'
// 解析post数据
import bodyparser from 'koa-bodyparser'

import auth from './routes/auth.js'

// 导入socketio模块
import socket from 'socket.io'
import http from 'http'

const app=new koa()
const router=koaRouter()

// socket.io使用方法
const server = http.createServer(app.callback())
const io = new socket(server)

app.use(bodyparser())
app.use(json())


// 聊天内容 self，message，avatar
let content=[] 
// 在线人数信息 user_name,avatar_url
let online=[]
io.on('connection',socket => {
    // 当前索引，disconnect要用
    let currentIndex
    // console.log('a user connected')

    socket.on('chat message',obj => {
        // console.log(`message is: ${msg}`)
        // socket.broadcast.emit('chat message',obj)
        // 添加聊天信息
        content.push(obj)
        io.emit('update message',content)
        // 将最新的消息显示在房间名下面，时间也是
        let date=new Date()
        let now
        let hour = date.getHours()
        let minute = date.getMinutes()
        // 时分小于等于9的时候加上0，如1时9分，则显示01:09
        hour<=9?hour='0'+hour:hour
        minute<=9?minute='0'+minute:minute
        now=hour+':'+minute
        io.emit('lastest message',obj,now)
    })

    socket.on('login',obj => {
        // 登陆后显示聊天内容
        io.emit('update message',content)
        // 添加在线人数
        online.push(obj)
        currentIndex=online.length-1
        io.emit('login success',online)
    })

    socket.on('update avatar',(name,url) => {
        // 这是更新在线人数的头像
        for(let i=0;i<online.length;i++){
            if(online[i].user_name==name){
                online[i].avatar_url=url
                break
            }
        }
        io.emit('update avatar success_online',online)

        // 这是更新聊天界面的头像
        for(let i=0;i<content.length;i++){
            if(content[i].self==name){
                content[i].avatar=url
                // 这里就不break了 因为这是聊天内容 有多条某个用户的信息 不是只改一条
            }
        }
        io.emit('update avatar success_chat',content)
    })

    socket.on('disconnect',() => {
        // console.log('delete:',currentIndex)
        // 用户离线时更新online数组并发送给客户端
        online.splice(currentIndex,1)
        io.emit('disconnected',online)
        // console.log('user disconnected')
    })
})


// app.use(async (ctx,next) => {
//     let start=new Date()
//     await next()
//     let ms=new Date()-start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })


app.on('error',(err,ctx) => {
    console.log('server error',err)
})

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径
router.use('/auth',auth.routes())

// 将路由规则挂载到Koa上
app.use(router.routes())

server.listen(3000,() => console.log('Koa is listening in 3000...'))

export default app