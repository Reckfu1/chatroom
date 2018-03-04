import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/views/index'
// import Register from '@/views/register'
// import Room from '@/views/room'
import axios from 'axios'
// 改用路由懒加载
const Index = () => import('@/views/index')
const Register = () => import('@/views/register')
const Room = () => import('@/views/room')

Vue.use(Router)

const routes=[
    {
        path:'*',
        redirect:'/'
    },
    {
        path:'/',
        component:Index
    },
    {
        path:'/Register',
        component:Register
    },
    {
        path:'/Chatroom',
        component:Room
    }
]

const router=new Router({
    routes
})

// 这里需要设置全局路由守卫
// 1.为了防止直接填写url访问这个chatroom路由
// 2.方便用户登录过后不需要重新登录，访问首页直接跳至聊天页面，token时效一小时
router.beforeEach((to,from,next) => {
    const token=localStorage.getItem('token')
    // 若访问首页(实现第2个功能)
    if(to.path=='/'){
        // 若token存在并验证通过
        if(token!=null&&token!='null'){
            axios.post('/auth/verify',{
                token
            })
            .then(res => {
                if(res.data.verify){
                    next({
                        path:'/Chatroom'
                    })
                }
                else{
                    next()
                }
            })
        }
        else{
            next()
        }
    }
    //实现第1个功能，防止用户直接输入url访问Chatroom
    else if(to.path=='/Chatroom'){
        if(token!=null&&token!='null'){
            axios.post('/auth/verify',{
                token
            })
            .then(res => {
                if(res.data.verify){
                    next()
                }
                // 验证不通过跳至首页
                else{
                    next({
                        path:'/'
                    })
                }
            })
        }
        // token为空跳至首页
        else{
            next({
                path:'/'
            })
        }
    }
    // 其他路由不需要验证token，比如Register
    else{
        next()
    }
})

export default router