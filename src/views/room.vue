<template>
    <div id="room">
        <div class="room-wrapper">
            <div class="chat-list">
                <div class="chat-item">
                    <img class="chat-item-img" src="../assets/josh-felise-79991.jpg">
                        
                    </img>
                    <div class="chat-item-detail">
                        <div class="chat-item-name">r空我eck</div>
                        <div class="chat-item-content">阿萨德:daskgjn你阿拉啊啥的啊啥的维</div>
                        <!-- timeline写这里面 便于定位 absolute -->
                        <span class="chat-item-time">13:24</span>
                    </div>
                </div>
                <div class="chat-group-options">
                    <!-- icon:add circle outline/people/person add/people outline/person/person outline -->
                    <div class="chat-group-create">
                        <mu-icon value="person_add" :size="26"/>
                        <!-- 为了对齐下面join group补两个字符 -->
                        <span>&nbsp;&nbsp;Create Group</span>
                    </div>
                    <div class="chat-group-join">
                        <mu-icon value="people" :size="26"/>
                        <span>Join Group</span>
                    </div>
                </div>
            </div>
            <div class="chat-interface"></div>
            <div class="chat-people"></div>    
        </div>
    </div>
</template>

<script>
// import '../../node_modules/ribbon.js/dist/ribbon.min.js'
export default {
}
</script>

<style lang="css">
#room{
    height: 100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/ps-bg2.jpeg') no-repeat;
    background-size: 100% 100%;
}
.room-wrapper{
    width:1100px;
    height: 600px;
    box-shadow: 0 5px 20px rgba(0,0,0,.3);
    background-color: #fff;
    display: flex;
}
.chat-list{
    width:22%;
    height: 600px;
    background-color: #E9EEF4;
    /*background-color:red;*/
    position: relative;
}
.chat-interface{
    width:56%;
    height: 600px;
    background-color: green;
}
.chat-people{
    width:22%;
    height: 600px;
    background-color: blue;
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
    box-shadow: 0 1px 50px rgba(0,0,0,.3);
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
}
</style>