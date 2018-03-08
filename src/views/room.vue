<template>
    <div id="room">
        <div class="room-wrapper">
            <chatList></chatList>
            <chatInterface></chatInterface>
            <onLine></onLine>
        </div>
        <img :src="src" alt="" style="width:38px;height:38px;background-color:white">
        <vue-core-image-upload
          style="width:100px;height:20px;background-color:red;cursor:pointer;text-align:center"
          :crop="false"
          @imageuploaded="upload"
          :max-file-size="5242880"
          url="/auth/upload">
          上传图片
        </vue-core-image-upload>
    </div>
</template>

<script>
// import '../../node_modules/ribbon.js/dist/ribbon.min.js'
import chatList from '@/components/chatList'
import chatInterface from '@/components/chatInterface'
import onLine from '@/components/onLine'

import VueCoreImageUpload from '../../node_modules/vue-core-image-upload/src/vue-core-image-upload';
export default {
    data() {
        return {
            src:"https://i.loli.net/2018/03/08/5aa02f6aa6cc0.jpg"
        }
    },
    components: {
        chatList,
        chatInterface,
        onLine,
        'vue-core-image-upload': VueCoreImageUpload
    },
    methods:{
        upload(res){
            console.log(res.mes)
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