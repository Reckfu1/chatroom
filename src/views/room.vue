<template>
    <div id="room">
        <div class="room-wrapper">
            <chatList></chatList>
            <chatInterface></chatInterface>
            <onLine @middleEvent="realModify"></onLine>
        </div>
        <user-info :message="userInfoPopup" @listenInUserInfoStatus="changeStatus" class="animated fadeIn"></user-info>
    </div>
</template>

<script>
// import '../../node_modules/ribbon.js/dist/ribbon.min.js'
import chatList from '@/components/chatList'
import chatInterface from '@/components/chatInterface'
import onLine from '@/components/onLine'
import userInfo from '@/components/userInfo'


export default {
    data() {
        return {
            userInfoPopup:false
        }
    },
    components: {
        chatList,
        chatInterface,
        onLine,
        'user-info':userInfo
    },
    methods:{
        realModify(){
            this.userInfoPopup=true
        },
        changeStatus(){
            this.userInfoPopup=false
        }

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