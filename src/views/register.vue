<template>
    <div id="register">
        <header>
            <span id="header-title">WELCOME TO JOIN US<br>CHATTING FREELY AND ENJOY THE MOMENT</span>
        </header>
        <section>
            <mu-text-field label="Username" hintText="" type="text" labelFloat underlineFocusClass="focus-line" labelFocusClass="focus-label" labelClass="label" underlineClass="line" :inputClass="{username_input_change:usernameIsBlur,username_input:usernameIsFocus}" @blur="blurNameColor" @focus="focusNameColor" v-model="user"/>
            <mu-text-field label="Password" hintText="" type="password" labelFloat underlineFocusClass="focus-line" labelFocusClass="focus-label" labelClass="label" underlineClass="line" :inputClass="{password_input_change:passwdIsBlur,password_input:passwdIsFocus}" @blur="blurPasswdColor" @focus="focusPasswdColor" v-model="password"/>
            <mu-flat-button @click="register" label="Sign Up" class="demo-flat-button" labelClass="registerbtn" color="#fff" rippleColor="#fff"/>
        </section>
        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">Fail To Register！</mu-popup>
    </div>
</template>

<script>
import md5 from 'md5'
export default {
    data() {
        return {
                user:'',
                password:'',
                usernameIsFocus:true,
                passwdIsFocus:true,
                usernameIsBlur:false,
                passwdIsBlur:false,
                disabled:true,
                // popup
                topPopup:false
        }
    },
    methods:{
        register(){
            let data={
                user_temp:this.user,
                password:md5(this.password)
            }
            this.axios.post('auth/register',data)
                .then(res => {
                    console.log(res.data)
                    if(res.data.success){
                        this.$router.push({
                            path:'/'
                        })
                    }
                    else{
                        this.topPopup=true
                    }
                })
        },
        blurNameColor(){
            this.usernameIsBlur=true
            this.usernameIsFocus=false
        },
        focusNameColor(){
            this.usernameIsBlur=false
            this.usernameIsFocus=true
        },
        blurPasswdColor(){
            this.passwdIsBlur=true
            this.passwdIsFocus=false
        },
        focusPasswdColor(){
            this.passwdIsBlur=false
            this.passwdIsFocus=true
        }
    },
    watch:{
        topPopup(val){
            if(val){
                setTimeout(() => {
                    this.topPopup=false
                },2000)
            }
        }
    }
}
</script>

<style lang="css">
#register{
    height: 100%;
    width:100%;
    background:url('../assets/josh-felise-79991.jpg') no-repeat;
    background-size: 100% 100%;
}
#header-title{
    position: absolute;
    font-size: 20px;
    color:#fff;
    /*font-weight: 300;*/
    /*background-color: red;*/
    width: 100%;
    text-align: center;
    top:70px;
    cursor: default;
    user-select: none;
}
#register section{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /*background-color: red;*/
}
/*#840404*/
.label{
    color:#fff !important;
    font-weight: 300;
    font-size: 14px;
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
.password_input,.username_input{
    color:#000;
    text-align: center;
}
.password_input_change,.username_input_change{
    color:#fff;
    text-align: center;
}

.registerbtn{
    font-size: 16px;
    font-weight: 300;
    text-transform: none;
}
.demo-flat-button{
    position: relative;
    top:15px;
}
/*popup*/
.demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
</style>