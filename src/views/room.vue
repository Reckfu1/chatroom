<template>
    <div id="room">
        <div class="room-wrapper">
            <chatList></chatList>
            <chatInterface></chatInterface>
            <onLine></onLine>
        </div>
    </div>
</template>

<script>
// import '../../node_modules/ribbon.js/dist/ribbon.min.js'
import chatList from '@/components/chatList'
import chatInterface from '@/components/chatInterface'
import onLine from '@/components/onLine'
export default {
    data() {
        return {

        }
    },
    components: {
        chatList,
        chatInterface,
        onLine
    }
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
    box-shadow: 0 0 30px rgba(0,0,0,.3);
    background-color: #fff;
    display: flex;
}
</style>