<template>
    <div id="chatlist">
        <div class="chat-item">
            <img class="chat-item-img" src="../assets/josh-felise-79991.jpg"></img>
            <div class="chat-item-detail">
                <div class="chat-item-name">Chatroom</div>
                <div class="chat-item-content">{{message}}</div>
                        <!-- timeline写这里面 便于定位 absolute -->
                <span class="chat-item-time">{{time}}</span>
            </div>
        </div>
        <div class="chat-group-options">
                    <!-- icon:add circle outline/people/person add/people outline/person/person outline -->
            <div class="chat-group-create">
                <mu-icon value="person_add" :size="24" color="rgba(0,0,0,.5)"/>
                    <!-- 为了对齐下面join group补两个空格 -->
                <span>&nbsp;&nbsp;Create Group</span>
            </div>
            <div class="chat-group-join">
                <mu-icon value="people" :size="24" color="rgba(0,0,0,.5)"/>
                <span>Join Group</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            message:'',
            time:''
        }
    },
    mounted(){
        this.socket.on('lastest message',(obj,now) => {
            this.message=obj.message
            this.time=now
        })
    }
}
</script>

<style lang="css">
#chatlist{
    width:22%;
    height: 600px;
    background-color: #fff;
    /*#E9EEF4*/
    /*background-color:red;*/
    position: relative;
    box-shadow: 1px 0 5px rgba(0,0,0,.1);
    z-index: 1000;
}

/*chat-item*/
.chat-item{
    width:100%;
    height: 60px;
    /*background-color:red;*/
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: default;
    user-select: none;
}
.chat-item-img{
    height: 45px;
    width:45px;
    /*background-color: white;*/
    border-radius: 50%;
}
.chat-item-detail{
    position: relative;
    height: 50px;
    width:70%;
    /*background-color:pink;*/
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    right:5px;
}
.chat-item-name,.chat-item-content{
    /*超出文字显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.chat-item-content{
    /*font-weight: 300;*/
    opacity: .5;
    font-size: 12px;
}
.chat-item-time{
    position: absolute;
    opacity: .5;
    top:5px;
    right:5px;
    font-size: 12px;
}

/*chat-group-options*/
.chat-group-options{
    width:100%;
    height: 40px;
    background-color: #fff;
    position: absolute;
    bottom:0;
    box-shadow: 0 -1px 10px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.chat-group-create,.chat-group-join{
    height: 30px;
    width:45%;
    /*background-color:red;*/
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    user-select: none;
}
.chat-group-options span{
    font-size: 12px;
    opacity:.5;
}
/*.chat-group-options:hover{
    box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
}*/
</style>