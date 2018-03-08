<template>
    <div id="index">
        <header>
            <!-- 左边项目名 -->
            <div class="project-name">
                <!-- ø -->
                <span>CHATROOM</span>
            </div>
            <!-- 登录注册 -->
            <div class="header-side" :class="{effect:isActive}">
                <span @mouseenter="showLine" @mouseleave="hideLine" @click="submitStatus">Sign In</span>
                <span>or</span>
                <span @click="goToRegister">Sign Up</span>
            </div>
        </header>
        <section>
            <!-- Heart to heart conversation reveals one's soul.... -->
            <span>HEART TO HEART TALK SHOW IS THE SOUL</span>
            <span>推心置腹的谈话就是心灵的展示</span>
        </section>  
        <login-popup :message="mes" @listenInStatus="changeMes" class="animated fadeIn"></login-popup>
    </div>
</template>

<script>
import loginPopup from '@/components/loginPopup'
export default {
    data() {
        return {
            isActive:false,
            mes:false
        }
    },
    methods:{
        showLine(){
            // this.$refs.line.style.color='red'
            // let beforeEle=window.getComputedStyle(this.$refs.line, ":before")
            // beforeEle.transform
            this.isActive=true
        },
        hideLine(){
            this.isActive=false
        },
        goToRegister(){
            this.$router.push({path:'/Register'})
        },
        // Login
        submitStatus(){
            this.mes=true
        },
        changeMes(){
            this.mes=false
        }
    },
    components:{
        // loginPopup
        'login-popup':loginPopup
    }
}
</script>

<style lang="css">
#index{
    height: 100%;
    width: 100%;
    /*background:url('../assets/pexels-photo-159935.jpeg') no-repeat;*/
    background:url('../assets/paul-green-126960.jpg') no-repeat;
    background-size: 100% 100%;
    /*background-position: 0 -120px;*/
    position: relative;
}
#index section{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#index section span{
    color:#fff;
    font-weight: 300;
    font-style: italic;
    cursor: default;
    opacity: .7;
    transition: all .25s ease;
    user-select: none;
}
#index section span:hover{
    opacity: 1;
}
/*.label{
    color:#fff !important;
    font-weight: 300;
}
.focus-label{
    color:#000 !important;
}
.line{
    background-color:#fff;
}
.focus-line{
    background-color:#000;
}
.password-input,.username-input{
    color:#000;
    text-align: center;
}*/
.project-name{
    /*font-family: 'Dancing Script', cursive;*/
    /*font-size: 48px;*/
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 32px;
    cursor: default;
    user-select: none;
    color:#fff;
}
.project-name span{
    position: absolute;
    top:26px;
    left:25px;
}
.header-side{
    position: absolute;
    /*background-color:red;*/
    right:20px;
    height: 100px;
    width:190px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.header-side span{
    font-size: 16px;
    user-select: none;
}
.header-side span:first-child{
    color:#fff;
    cursor: pointer;
    position: relative;
}
.header-side span:nth-child(2){
    color:gray;
    opacity: .6;
    cursor: default;
}
.header-side span:last-child{
    background-color: #fff;
    color:#000;
    padding:5px 10px 5px 10px;
    border-radius: 2px;
    cursor: pointer;
    transition: all .25s ease;
}
.header-side span:first-child:before{
    content: '';
    position: absolute;
    width:50px;
    height: 1px;
    left:0;
    top:27px;
    background-color: rgba(128,128,128,1);
    transform:scaleX(0);
    transition:all .25s ease;
}
.effect span:first-child:before{
    content: '';
    position: absolute;
    width:50px;
    height: 1px;
    left:0;
    top:27px;
    background-color: rgba(255,255,255,1);
    transform:scaleX(1);
    /*transition:all .25s ease;*/
}
.header-side span:last-child:hover{
    background-color:rgba(0,0,0,1);
    color:#fff;
}
</style>
