<!-- <template>
    <div id="login">
        <header>
            <span id="login-header-title">WELCOME BACK</span>
        </header>
        <section>
            <mu-text-field label="Username" hintText="" type="text" labelFloat underlineFocusClass="login-focus-line" labelFocusClass="login-focus-label" labelClass="login-label" underlineClass="login-line" :inputClass="{login_username_input_change:usernameIsBlur,login_username_input:usernameIsFocus}" @blur="blurNameColor" @focus="focusNameColor"/>
            <mu-text-field label="Password" hintText="" type="password" labelFloat underlineFocusClass="login-focus-line" labelFocusClass="login-focus-label" labelClass="login-label" underlineClass="login-line" :inputClass="{login_password_input_change:passwdIsBlur,login_password_input:passwdIsFocus}" @blur="blurPasswdColor" @focus="focusPasswdColor"/>
            <mu-flat-button label="Sign In" class="demo-flat-button" labelClass="loginbtn" color="#fff" rippleOpacity=".5" rippleColor="#fff"/>
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
#login{
    height: 100%;
    width: 100%;
    background:url('../assets/paul-green-126960.jpg') no-repeat;
    background-size: 100% 100%;
}
#login section{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-label{
    color:#fff !important;
    font-weight: 300;
    font-size: 14px;
}
.login-focus-label{
    color:#E16428 !important;
}
.login-line{
    background-color:#fff;
}
.login-focus-line{
    background-color:#E16428;
}
.login_username_input,.login_password_input{
    color:#000;
    text-align: center;
}
.login_username_input_change,.login_password_input_change{
    color:#fff;
    text-align: center;
}
#login-header-title{
    position: absolute;
    font-family: serif;
    -webkit-column-rule: #E16428;
    -moz-column-rule: #E16428;
    -o-column-rule: #E16428;
    column-rule: #E16428;
    font-size: 30px;
    width: 100%;
    /*background-color: red;*/
    text-align: center;
    top:70px;
    cursor: default;
    user-select: none;
}
</style>
 -->