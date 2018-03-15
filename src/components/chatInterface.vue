<template>
    <div id="interface">
        <div class="room-top">
            <div class="room-name">Discuss UI/UX(32)</div>
        </div>
        <div class="chat-content">
            <div class="content-item" v-for="item in content">
                <img :src="item.avatar" alt="">
                <div class="content-box">
                    <div class="self-name">{{item.self}}</div>
                    <div class="self-msg">{{item.message}}</div>
                </div>
            </div>
        </div>
        <div class="message-input">
            <div class="send-emoji">
                <!-- icon tag_faces -->
                <mu-icon value="tag_faces" color="gray" :size="size"/>
            </div>
            <input type="text" class="typing" placeholder="Type something here..." v-model="value" @keyup.enter="send">
            <div class="send-img">
                <!-- icon image -->
                <mu-icon value="image" color="gray" :size="size"/>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client'
const socket=io('http://localhost:3000')
export default {
    data () {
        return {
            // muse-ui 类型警告
            size:24,
            value:'',
            obj:{
                message:'',
                self:'',
                avatar:'https://i.loli.net/2018/03/08/5aa02f6aa6cc0.jpg'
            },
            content:[]
        }
    },
    methods:{
        // 发送
        send(){
            this.obj.message=this.value
            socket.emit('chat message',this.obj)
            this.value=''
        }
    },
    mounted(){
        this.axios.post('/auth/getinfo',{
            token:localStorage.getItem("token")
        })
        .then(res => {
            if(res.data.get_userinfo){
                this.obj.self=res.data.result.user_name
                if(res.data.result.avatar_url) this.obj.avatar=res.data.result.avatar_url
            }
        })
        // 接收
        socket.on('chat message',obj => {
            this.content.push(obj)
            console.log(this.content)
        })
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
/*section*/
.chat-content{
    height: 480px;
    width: 100%;
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
.send-img,.send-emoji{
    height: 40px;
    width:7%;
    background-color: rgba(255,255,255,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.send-img{
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
}
/*聊天内容*/
.chat-content{
    overflow: scroll;
    position: relative;
}
.content-item{
    margin-top:10px;
    margin-left: 10px;
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
    padding: 3px;
    box-shadow: 0 4px 10px rgba(0,0,0,.2);
}
</style>