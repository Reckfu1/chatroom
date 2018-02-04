<template>
    <div id="interface">
        <div class="room-name"></div>
        <div class="message-input"></div>
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
.room-name{
    height: 95px;
    width:100%;
    background-color: #ebf1f6;
    position: absolute;
    top:0;
}
.message-input{
    height: 40px;
    width:100%;
    background-color: #fff;
    position: absolute;
    bottom:0;
}
</style>