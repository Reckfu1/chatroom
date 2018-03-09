<template>
    <div id="userInfo" @click.self="hideUserInfo" v-if="toggleInfoPopup">
        <section>
            <div class="modify-box">
                <div class="avatar-box">
                    <img src="../assets/me.jpg" alt="">
                </div>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="sex" labelFloat/>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="profession" labelFloat/>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="hobby" labelFloat/>
                <mu-flat-button label="Confirm" color="#000" labelClass="info-flat-btn"/>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            toggleInfoPopup:false
        }
    },
    props:['message'], 
    methods:{
        hideUserInfo(){
            this.toggleInfoPopup=false
            this.$emit('listenInUserInfoStatus')
        }
    },
    watch:{
        message(){
            if(this.message){
                this.toggleInfoPopup=true
            }
        }
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