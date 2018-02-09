<template>
    <div id="interface">
        <div class="room-top">
            <div class="room-name">Discuss UI/UX(32)</div>
        </div>
        <div class="message-input">
            <div class="send-img"></div>
            <input type="text" class="typing" placeholder="Type something here...">
            <div class="send-emoji"></div>
        </div>
    </div>
</template>

<script>
export default {

    data () {
        return {

        }
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
.room-top{
    height: 80px;
    width:100%;
    background-color: #ebf1f6;
    position: absolute;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
}
.message-input{
    height: 40px;
    width:100%;
    background-color: #fff;
    position: absolute;
    bottom:0;
    display: flex;
}
.room-name{
    color:gray;
}
.send-img,.send-emoji{
    height: 40px;
    width:7%;
    background-color: rgba(255,255,255,.1);
}
.typing{
    /*font-style: italic;*/
    font-weight: 300;
    height: 40px;
    width:86%;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    line-height: 40px;
    color:gray;
    text-indent: 8px;
    /*去掉ios默认的蓝色焦点效果*/
    border: none;
    outline: none;
}
</style>