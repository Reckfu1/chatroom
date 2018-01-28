import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Register from '@/views/register'
import Room from '@/views/room'

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

export default router