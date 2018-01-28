<template>
    <div id="popup" @click.self="hidePopup" v-if="togglePopup">
        <div class="login-wrapper">
            <div class="wrap-left">
                <div class="wrap-left-content">
                    Hello<br>World.
                </div>
                <span>Friends, Welcome Back</span>
                <div class="wrap-left-mask"></div>
            </div>
            <div class="wrap-right">
                <mu-text-field label="Username" hintText="" type="text" labelFloat underlineFocusClass="common-focus-line" labelFocusClass="common-focus-label" labelClass="common-label" underlineClass="common-line" inputClass="common-username-input"/>
                <mu-text-field label="Password" hintText="" type="password" labelFloat underlineFocusClass="common-focus-line" labelFocusClass="common-focus-label" labelClass="common-label" underlineClass="common-line" inputClass="common-password-input"/>
                <mu-flat-button label="Sign In" class="flat-button" labelClass="registerbtn" color="#000" rippleOpacity=".7" rippleColor="#fff" @click="goToChatRoom"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            togglePopup:false
        }
    },
    props:['message'],
    // 通过props接收来自父组件的popup状态，再通过观察模式动态改变popup的显示
    watch:{
        message(){
            if(this.message==true){
                this.togglePopup=true
            }
        }
    },
    methods:{
        hidePopup(){
            this.togglePopup=false
            // 同时通过emit触发changeStatus事件，父组件监听后改变message
            this.$emit('changeStatus')
        },
        goToChatRoom(){
            this.$router.push({path:'/Chatroom'})
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
</style>