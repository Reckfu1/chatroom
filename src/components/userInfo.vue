<template>
    <div id="userInfo" @click.self="hideUserInfo" v-if="toggleInfoPopup">
        <section>
            <div class="modify-box">
                <div class="avatar-box">
                    <!-- <img :src="src" alt=""> -->
                    <!-- 因为sm.ms需要指定上传表单smfile字段(表单名称)，所以inputOfFile设置成smfile-->
                    <vue-core-image-upload
                        style="width:50px;height:50px;cursor:pointer"
                        :crop="false"
                        @imageuploaded="upload"
                        :max-file-size="5242880"
                        inputOfFile="smfile"
                        url="/api/upload?name=smfile">
                        <img :src="src" alt="">
                    </vue-core-image-upload>
                </div>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="Sex" labelFloat v-model="value.sex_value"/>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="Profession" labelFloat v-model="value.pro_value"/>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="Hobby" labelFloat v-model="value.hobby_value"/>
                <mu-flat-button label="Confirm" color="#000" labelClass="info-flat-btn" @click="confirmModify"/>
            </div>
        </section>
    </div>
</template>

<script>
// 不能直接import组件，组件本身有问题
import VueCoreImageUpload from '../../node_modules/vue-core-image-upload/src/vue-core-image-upload'
export default {
    data(){
        return {
            toggleInfoPopup:false,
            src:'',
            value:{
                sex_value:'',
                pro_value:'',
                hobby_value:''
            }
        }
    },
    props:['message'], 
    methods:{
        hideUserInfo(){
            this.toggleInfoPopup=false
            // 监听的同时顺便把头像地址也发给onLine组件
            this.$emit('listenInUserInfoStatus',this.src)
        },
        upload(res){
            if(res.code=='success'){
                this.src=res.data.url
                // 将头像存在数据库,上传头像不需要按确定按钮
                this.axios.post('/auth/upload',{
                    ava_url:res.data.url,
                    token:localStorage.getItem("token")
                })
            }
        },
        confirmModify(){
            this.axios.post('/auth/modify',{
                value:this.value,
                token:localStorage.getItem("token")
            })
            .then(res => {
                console.log('修改成功')
                // 用户修改完毕后，online组件中profession也要改变，所以要监听
                // 同样的，userInfo->room通过emit传递数据，room->onLine通过props传递数据
                // 但是这次是userInfo.vue -> room.vue -> onLine.vue
                this.$emit('middleEventWatchPro',this.value.pro_value)
            })
        }
    },
    mounted(){
        // 获取信息(sex,profession,hobby)
        // 如果用get，则必须发一次请求来获取用户id或者用户名才能获取其他数据，所以直接用post，传token，服务器解析token，返回数据
        this.axios.post('/auth/getinfo',{
            token:localStorage.getItem("token")
        })
        .then(res => {
            if(res.data.get_userinfo){
                let temp=res.data.result
                this.value.sex_value=temp.user_sex
                this.value.pro_value=temp.user_profession
                this.value.hobby_value=temp.user_hobby
                this.src=temp.avatar_url
            }
        })
    },
    watch:{
        message(){
            if(this.message){
                this.toggleInfoPopup=true
            }
        }
    },
    components:{
        'vue-core-image-upload': VueCoreImageUpload
    }
}
</script>

<style lang="css">
#userInfo{
    height: 100%;
    width:100%;
    /*background-color: red;*/
    background-color: rgba(7,17,27,.6);
    position: absolute;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}
.modify-box{
    height: 400px;
    width:270px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
/*avatar-box*/
.avatar-box{
    height: 60px;
    width:60px;
    border:1px solid rgba(0,0,0,.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-box img{
    height: 50px;
    width:50px;
    border-radius: 50%;
}
/*input*/
.info-common-label{
    font-size: 14px;
    font-weight: 300;
}
.info-common-class{
    font-size: 14px;
    width:200px;
}
.info-common-focus-underline{
    background-color:#000;
}
.info-common-focus-label{
    color:#000;
}
.info-flat-btn{
    text-transform: none;
    font-weight: 300;
}
</style>