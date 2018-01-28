<template>
    <div id="register">
        <header>
            <span id="header-title">WELCOME TO JOIN US<br>CHATTING FREELY AND ENJOY THE MOMENT</span>
        </header>
        <section>
            <mu-text-field label="Username" hintText="" type="text" labelFloat underlineFocusClass="focus-line" labelFocusClass="focus-label" labelClass="label" underlineClass="line" :inputClass="{username_input_change:usernameIsBlur,username_input:usernameIsFocus}" @blur="blurNameColor" @focus="focusNameColor"/>
            <mu-text-field label="Password" hintText="" type="password" labelFloat underlineFocusClass="focus-line" labelFocusClass="focus-label" labelClass="label" underlineClass="line" :inputClass="{password_input_change:passwdIsBlur,password_input:passwdIsFocus}" @blur="blurPasswdColor" @focus="focusPasswdColor"/>
            <mu-flat-button label="Sign Up" class="demo-flat-button" labelClass="registerbtn" color="#fff" rippleOpacity=".5" rippleColor="#fff"/>
        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
                usernameIsFocus:true,
                passwdIsFocus:true,
                usernameIsBlur:false,
                passwdIsBlur:false,
                disabled:true
        }
    },
    methods:{
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
</style>