<template>
    <div id="room">
        <div class="room-wrapper">
            <chatList></chatList>
            <chatInterface></chatInterface>
            <onLine @middleEvent="realModify" @middleEventLookInfo="realLookInfo" :message="professionVal" :avatar="src"></onLine>
        </div>
        <user-info :message="userInfoPopup" @listenInUserInfoStatus="changeUserInfoStatus" class="animated fadeIn" @middleEventWatchPro="realWatchPro"></user-info>
        <person-info :message="personInfoPopup" :name="personName" @listenInPersonInfoStatus="changePersonInfoStatus" class="animated fadeIn"></person-info>
    </div>
</template>

<script>
// import '../../node_modules/ribbon.js/dist/ribbon.min.js'
import chatList from '@/components/chatList'
import chatInterface from '@/components/chatInterface'
import onLine from '@/components/onLine'
import userInfo from '@/components/userInfo'
import personInfo from '@/components/personInfo'
export default {
    data() {
        return {
            userInfoPopup:false,
            professionVal:'',
            src:'',
            personInfoPopup:false,
            personName:''
        }
    },
    components: {
        chatList,
        chatInterface,
        onLine,
        'user-info':userInfo,
        'person-info':personInfo
    },
    methods:{
        realModify(){
            this.userInfoPopup=true
        },
        changeUserInfoStatus(url){
            this.userInfoPopup=false
            this.src=url
        },
        realLookInfo(name){
            this.personInfoPopup=true
            this.personName=name
        },
        changePersonInfoStatus(){
            this.personInfoPopup=false
        },
        realWatchPro(val){
            this.professionVal=val
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