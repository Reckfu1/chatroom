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

io.on('connection',socket => {
    console.log('a user connected')
    socket.on('chat message',obj => {
        // console.log(`message is: ${msg}`)
        // socket.broadcast.emit('chat message',obj)
        io.emit('chat message',obj)
    })
    socket.on('disconnect',() => {

        console.log('user disconnected')
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