<template>
    <div id="online">
        <div class="person">
            <div class="person-detail">
                <img class="person-img" :src="src"></img>
                <div class="person-profile">
                    <div class="person-name">{{name}}</div>
                    <div class="person-info">{{profession}}</div>
                </div>
            </div>
            <div class="person-options">
                <!-- sort / format align left/menu -->
                <mu-icon value="sort" :size="28" color="#fff" @click="modifyInfo" style="user-select:none"/>
            </div>
        </div>
        <div class="online-people">
            <span class="available">AVAILABLE NOW</span>
            <div class="online-detail" v-for="item in online">
                <img :src="item.avatar_url">
                <div class="people-wrapper">
                    <span class="people-name" @click="lookPersonInfo(item.user_name)">{{item.user_name}}</span>
                    <!-- brightness 1 -->
                    <mu-icon value="brightness_1" :size="12" color="green" class="online-sign"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import io from 'socket.io-client'
// const socket=io('http://localhost:3000')
export default {
    data(){
        return {
            name:'',
            profession:'',
            src:'',
            result:{},
            online:[]
        }
    },
    props:['message','avatar'],
    methods:{
        // 这个userInfo组件的显示实现方法不同于loginPopup组件
        // 要利用一个中间事件来完成显示信息框，因为userInfo组件不在这里，而是在room.vue
        // onLine->room通过emit传递数据，room->userInfo通过props传递数据
        // onLine.vue -> room.vue -> userInfo.vue
        modifyInfo(){
            this.$emit('middleEvent')
        },
        lookPersonInfo(name){
            this.$emit('middleEventLookInfo',name)
        }
    },
    mounted(){
        // 获取用户 职业 头像地址
        this.axios.post('/auth/getinfo',{
            token:localStorage.getItem("token")
        })
        .then(res => {
            if(res.data.get_userinfo){
                // 先触发登录事件，更改在线人数列表
                this.socket.emit('login',res.data.result)
                this.name=res.data.result.user_name
                this.profession=res.data.result.user_profession
                // if(res.data.result.avatar_url) this.src=res.data.result.avatar_url
                this.src=res.data.result.avatar_url
            }
        })
        // 更改在线人数成功
        this.socket.on('login success',obj => {
            this.online=obj
        })
        // 监听是否有人离线
        this.socket.on('disconnected',obj => {
            this.online=obj
        })

        // 监听是否用户更改了头像，更新在线人数信息
        this.socket.on('update avatar success_online',obj => {
            this.online=obj
        })
    },
    watch:{
        message(){
            this.profession=this.message
        },
        avatar(){
            // 用户修改完头像后立刻显示
            this.src=this.avatar
            // 同时emit修改onLine数组，才能实时更新online人数中的头像
            this.socket.emit('update avatar',this.name,this.avatar)
        }
    }
}
</script>

<style lang="css" scoped>
#online{
    width:22%;
    height: 600px;
    background-color: #ebf1f6;
    box-shadow: -1px 0 5px rgba(0,0,0,.1);
    z-index: 1000;
}
/*person*/
.person{
    height: 95px;
    width:100%;
/*    position: absolute;
    top:0;*/
    /*background-color: red;*/
    display: flex;
}
.person-detail{
    height: 80px;
    width:75%;
    background-color: #7b7eae;
    display: flex;
    justify-content: center;
    align-items: center;
}
.person-options{
    height: 80px;
    width:25%;
    background-color: #868abb;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.person-img{
    height: 45px;
    width:45px;
    border-radius: 50%;
}
.person-profile{
    height: 40px;
    width:60%;
    /*background-color: red;*/
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    left: 8px;
}
.person-name,.person-info{
    /*超出文字显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.person-name,.person-info{
    user-select: none;
}
.person-name{
    font-weight: bold;
    font-size: 14px;
}
.person-info{
    font-size: 12px;
    font-weight: 300;
    opacity: .8;
}

/*online people*/
.online-people{
    height: 505px;
    width:100%;
    overflow: auto;
}
::-webkit-scrollbar{
    display:none;
}
.available{
    font-size: 12px;
    color:gray;
    position: relative;
    left: 17px;
}
.online-detail{
    margin-top:15px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-color: red;*/
}
.online-detail img{
    height: 25px;
    width:25px;
    /*border-radius: 50%;*/
}
.people-wrapper{
    height: 25px;
    width:76%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    /*background-color: red;*/
}
.people-name{
    position: relative;
    left: 10px;
    width:120px;
    font-size: 12px;
    /*超出文字显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    user-select: none;
    cursor: pointer;
}
.online-sign{
    position: relative;
    right:10px;
    user-select: none;
}
</style>