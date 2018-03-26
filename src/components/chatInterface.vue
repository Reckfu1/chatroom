<template>
    <div id="interface">
        <div class="room-top">
            <div class="room-name">Chatroom({{count}})</div>
        </div>
        <div class="chat-content" ref='chat'>
            <div class="content-item animated flash" v-for="item in content">
                <img :src="item.avatar" alt="">
                <div class="content-box">
                    <div class="self-name">{{item.self}}</div>
                    <div class="self-msg" v-html="item.message"></div>
                </div>
            </div>
        </div>
        <div class="message-input">
            <div class="send-emoji" @click='showEmoji=!showEmoji' ref='btn'>
                <mu-icon value="tag_faces" color="gray" :size="size" style="pointer-events:none;user-select:none"/>
            </div>
            <input type="text" class="typing" placeholder="Type something here..." v-model="value" @keyup.enter="send">
            <!-- 这是个空的span 为了配合vue-emoji组件的属性使用，因为它必须要填写area -->
            <span style="display:none" ref='edit'></span>
            <div class="send-msg">
                <!-- <mu-icon value="arrow_upward" color="gray" :size="size" @click="send"/> -->
                <mu-icon value="code" color="gray" :size="size" @click="sendCode"/>
            </div>
        </div>
        <vue-emoji
            v-show='showEmoji'
            ref='emoji'
            :unicode='true'
            :auto-insert='false'
            @select='handleSelect'
            @hide='handleHide'
        ></vue-emoji>
    </div>
</template>

<script>
import 'rui-vue-emoji/dist/vue-emoji.css'
import emoji from 'rui-vue-emoji'
// prism.css
import 'prismjs/themes/prism.css'
export default {
    data () {
        return {
            // muse-ui 类型警告
            size:24,
            value:'',
            obj:{
                message:'',
                self:'',
                avatar:''
            },
            content:[],
            count:0,
            // emoji
            showEmoji:false,
            // 权限
            permission:'',
            // 发送的是否为代码
            isCode:false
        }
    },
    methods:{
        // 发送
        send(){
            if(this.value=='') return
            this.isCode=false
            this.obj.message=this.value
            // 为了用户在修改完头像之后实时更新聊天内容中用户的头像，每次发信息都会请求一遍用户的最新头像地址
            this.axios.post('/auth/getinfo',{
                token:localStorage.getItem("token")
            })
            .then(res => {
                this.obj.avatar=res.data.result.avatar_url
                // 发送对象是想知道谁是发送人
                this.socket.emit('chat message',this.obj,this.isCode)
                this.value=''
            })
        },
        sendCode(){
            if(this.value=='') return
            this.isCode=true
            this.obj.message=this.value
            // 为了用户在修改完头像之后实时更新聊天内容中用户的头像，每次发信息都会请求一遍用户的最新头像地址
            this.axios.post('/auth/getinfo',{
                token:localStorage.getItem("token")
            })
            .then(res => {
                this.obj.avatar=res.data.result.avatar_url
                // 发送对象是想知道谁是发送人
                this.socket.emit('chat message',this.obj,this.isCode)
                this.value=''
            })  
        },
        // emoji
        hide(){
            this.showEmoji=false
        },
        handleHide(e){
            this.hide()
        },
        handleSelect(img){
            console.log('img:',img,'type:',typeof(img))
            console.log('img.textContent:',img.textContent,'type:',typeof(img.textContent))
            this.value+=img.textContent
            this.hide()
        },
        getPermission(){
            Notification.requestPermission(permission => {
                if(permission==='granted'){
                    console.log('用户允许接收通知')
                    this.permission=permission
                }
                else{
                    console.log('用户拒绝接收通知')
                    this.permission=''
                }
            })
        },
        createNotification(icon,data){
            const temp=new Notification('New Message',{
                body:data,
                icon
            })
            setTimeout(() => temp.close(),3500)
        }
    },
    mounted(){
        this.axios.post('/auth/getinfo',{
            token:localStorage.getItem("token")
        })
        .then(res => {
            if(res.data.get_userinfo){
                this.obj.self=res.data.result.user_name
                // if(res.data.result.avatar_url) this.obj.avatar=res.data.result.avatar_url
                this.obj.avatar=res.data.result.avatar_url
            }
        })

        // 弹出通知框请求获取通知权限
        this.getPermission()

        // 接收
        this.socket.on('update message',obj => {
            this.content=obj
            // scrollHeight是自身元素的高度+隐藏元素的高度(offsetHeight+scrollTop)
            // scrollTop是滚动条所滚条的高度，也就是隐藏的高度，如scrollTop值为12后，滑块的位置改变了，显示是卷过了12个像素的文本
            // 收到消息时读取消息框的真实高度scrollHeight，然后让scrollTop等于它,即可滚动界面到最底部
            // 但如果直接写scrollTop等于scrollHeight会有bug，滚动条都是滚动到倒数第二条数据上，解决方案是加nextTick
            // http://blog.csdn.net/u014520745/article/details/70241772
            this.$nextTick(() => {
                this.$refs.chat.scrollTop=this.$refs.chat.scrollHeight
             })
            if(this.permission==='granted'){
                // console.log(obj[obj.length-1].message)
                // 检查消息是否为空，防止第一次显示空白的通知，原因是逻辑写在了mounted
                if(obj[obj.length-1].message){
                    // 发送人不推送通知
                    console.log(this.obj.self,'and',obj[obj.length-1].self)
                    if(this.obj.self!=obj[obj.length-1].self){
                        this.createNotification(obj[obj.length-1].avatar,obj[obj.length-1].message)
                    }
                }
            }
        })

        this.socket.on('update avatar success_chat',obj => {
            this.content=obj
        })
        // 登陆成功或离开聊天室后更新在线人数统计
        this.socket.on('login success',obj => {
            this.count=obj.length
        })
        this.socket.on('disconnected',obj => {
            this.count=obj.length
        })

        // emoji
        this.$refs.emoji.appendTo({
            area:this.$refs.edit,
            btn:this.$refs.btn,
            position:'top left'
        })
    },
    components:{
        'vue-emoji':emoji
    }
}
</script>

<style lang="css" scoped>
#interface{
    width:56%;
    height: 600px;
    background-color: #dde4ee;
    position: relative;
}

/*top*/
.room-top{
    height: 80px;
    width:100%;
    background-color: #ebf1f6;
/*    position: absolute;
    top:0;*/
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 10px rgba(0,0,0,.1);
}
.room-name{
    /*color:gray;*/
    user-select: none;
}

/*bottom*/
.message-input{
    height: 40px;
    width:100%;
    background-color: #fff;
/*    position: absolute;
    bottom:0;*/
    display: flex;
}
.send-msg,.send-emoji{
    height: 40px;
    width:7%;
    background-color: rgba(255,255,255,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.send-msg{
    box-shadow: -1px 0 10px rgba(0,0,0,.1);
}
.send-emoji{
    box-shadow: 1px 0 10px rgba(0,0,0,.1);
    /*???*/
    z-index: 100;
}
.typing{
    /*font-style: italic;*/
    font-weight: 300;
    height: 40px;
    width:86%;
    line-height: 40px;
    color:gray;
    text-indent: 10px;
    /*去掉ios默认的蓝色焦点效果*/
    border: none;
    outline: none;
    background-color: white;
}
/*聊天内容*/
.chat-content{
    height: 480px;
    width: 100%;
    overflow: auto;
    position: relative;
}
/*可滚动但是不显示滚动条的方法*/
::-webkit-scrollbar{
    display:none;
}
.content-item{
    margin-top:10px;
    margin-left: 10px;
    margin-bottom: 10px;
    width:95%;
    /*background-color: red;*/
    display: flex;
}
.content-item img{
    height: 40px;
    width:40px;
    border-radius: 50%;
}
.content-box{
    margin-left: 6px;
}
.self-name{
    
}
.self-msg{
    max-width: 400px;
    word-wrap: break-word;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0 4px 10px rgba(0,0,0,.2);
}
</style>