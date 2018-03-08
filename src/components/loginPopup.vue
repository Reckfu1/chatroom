<template>
    <div id="popup" @click.self="hidePopup" v-if="toggleLoginPopup">
        <div class="login-wrapper">
            <div class="wrap-left">
                <div class="wrap-left-content">
                    Hello<br>World.
                </div>
                <span style="letter-spacing:1px">Friends, Welcome Back</span>
                <div class="wrap-left-mask"></div>
            </div>
            <div class="wrap-right">
                <mu-text-field v-model="user" label="Username" hintText="" type="text" labelFloat underlineFocusClass="common-focus-line" labelFocusClass="common-focus-label" labelClass="common-label" underlineClass="common-line" inputClass="common-username-input"/>
                <mu-text-field v-model="password" label="Password" hintText="" type="password" labelFloat underlineFocusClass="common-focus-line" labelFocusClass="common-focus-label" labelClass="common-label" underlineClass="common-line" inputClass="common-password-input"/>
                <mu-flat-button label="Sign In" class="flat-button" labelClass="registerbtn" color="#000" :rippleOpacity="rippleOpacity" rippleColor="#fff" @click="userLogin"/>
            </div>
        </div>
        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup" @hide="goToChatroom">
            {{loginSign?'Login Success！':'Fail to login, please try again.'}}
        </mu-popup>
    </div>
</template>

<script>
import md5 from 'md5'
export default {
    data(){
        return {
            toggleLoginPopup:false,
            user:'',
            password:'',
            // popup muse-ui
            topPopup:false,
            // 作为跳转条件以及文字显示条件
            loginSign:false,
            // muse-ui检查类型使得控制台有警告 解决
            rippleOpacity:.7

        }
    },
    props:['message'],
    // 通过props接收来自父组件的popup状态，再通过观察模式动态改变popup的显示
    watch:{
        message(){
            if(this.message){
                this.toggleLoginPopup=true
            }
        },
        // 这个是muse-ui的popup
        topPopup(val){
            if(val){
                setTimeout(() => {
                    this.topPopup=false
                },2000)
            }
        }
    },
    methods:{
        hidePopup(){
            this.toggleLoginPopup=false
            //清空输入框的信息
            this.user=''
            this.password=''
            // 同时通过emit触发changeStatus事件，父组件监听后改变message
            this.$emit('listenInStatus')
        },
        userLogin(){
            if(!this.user||!this.password){
                this.loginSign=false
                this.topPopup=true
            }
            else{
                let data={
                    user_temp:this.user,
                    password:md5(this.password)
                }
                this.axios.post('/auth/login',data)
                    .then(res => {
                        if(res.data.success){
                            // 成功的话服务端返回token给客户端
                            localStorage.setItem('token',res.data.token)
                            this.loginSign=true
                            this.topPopup=true
                            // console.log(`status:${this.loginSign}`)
                        }
                        else{
                            this.loginSign=false
                            this.topPopup=true
                            // 一旦登录失败便清空token
                            localStorage.setItem('token',null)
                        }
                    })
            }
        },
        goToChatroom(){
            // console.log(`status:${this.loginSign}`)
            if(this.loginSign){
                this.$router.push({
                    path:'/Chatroom'
                })
                console.log('enter chatroom')
            }
            else{
                this.user=''
                this.password=''
            }
        }
    }
}
</script>

<style lang="css">
#popup{
    height: 100%;
    width:100%;
    position: absolute;
    background-color: rgba(7,17,27,.6);
    /*background-color: red;*/
    top:0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-wrapper{
    height: 450px;
    width:650px;    
    background-color: #fff;
    position: relative;
}
.wrap-left{
    width:50%;
    height: 450px;
    /*background-color:red;*/
    position: absolute;
    left:0;
    background:url('../assets/priscilla-du-preez-234138.jpg') no-repeat;
    background-position: -70px 0;
}
.wrap-right{
    width:50%;
    height: 450px;
    /*background-color: blue;*/
    position: absolute;
    right:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.wrap-left-mask{
    position: absolute;
    height: 100%;
    width:100%;
    background-color: rgba(0,0,0,.3);
    top:0;
    z-index: 100;
}
.wrap-left-content{
    position: absolute;
    left:20px;
    top:50px;
    font-size: 60px;
    color:#fff;
    z-index:200;
    font-weight: 600;
}
.wrap-left span{
    display: inline-block;
    font-size: 14px;
    position: relative;
    width:100%;
    text-align: center;
    /*background-color:#fff;*/
    color:#fff;
    top:310px;
}
.common-label{
    color:#808B97 !important;
    font-weight: 300;
    font-size: 14px;
}
.common-focus-label{
    color:#000 !important;
}
.common-line{
    background-color:#808B97;
}
.common-focus-line{
    background-color:#000;
}
.common-password-input,.common-username-input{
    color:#000;
    text-align: center;
}
.flat-button{
    position: relative;
    top:15px;
}
/*muse-ui popup*/
.demo-popup-top {
    font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
    width: 100%;
    opacity: .7;
    height: 44px;
    line-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
}
</style>