<template>
    <div id="room">
        <div class="room-wrapper">
            <chatList></chatList>
            <chatInterface></chatInterface>
            <onLine @middleEvent="realModify"></onLine>
        </div>
        <!-- <img :src="src" alt="" style="width:38px;height:38px;background-color:white"> -->
<!--         <vue-core-image-upload
          style="width:100px;height:20px;background-color:red;cursor:pointer;text-align:center"
          :crop="false"
          @imageuploaded="upload"
          :max-file-size="5242880"
          inputOfFile="smfile"
          url="/api/upload?name=smfile">
          上传图片
        </vue-core-image-upload> -->
        <!-- 因为sm.ms需要指定上传表单smfile字段(表单名称)，所以inputOfFile设置成smfile-->
        <user-info :message="userInfoPopup" @listenInUserInfoStatus="changeStatus" class="animated fadeIn"></user-info>
    </div>
</template>

<script>
// import '../../node_modules/ribbon.js/dist/ribbon.min.js'
import chatList from '@/components/chatList'
import chatInterface from '@/components/chatInterface'
import onLine from '@/components/onLine'
import userInfo from '@/components/userInfo'
// 不能直接import组件，组件本身有问题
// import VueCoreImageUpload from '../../node_modules/vue-core-image-upload/src/vue-core-image-upload'

export default {
    data() {
        return {
            // src:"https://i.loli.net/2018/03/08/5aa02f6aa6cc0.jpg"
            userInfoPopup:false
        }
    },
    components: {
        chatList,
        chatInterface,
        onLine,
        'user-info':userInfo
        // 'vue-core-image-upload': VueCoreImageUpload
    },
    methods:{
        // upload(res){
        //     if(res.code=='success') this.src=res.data.url
        // }
        // modifyInfo(){
        //     this.userInfoPopup=true
        // },
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