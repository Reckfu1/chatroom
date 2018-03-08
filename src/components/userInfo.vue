<template>
    <div id="userInfo" @click.self="hideUserInfo" v-if="toggleInfoPopup">
        asdnasldknaslkdnalksdnlaksnd
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
                console.log(this.message)
                this.toggleInfoPopup=true
            }
        }
    }
}
</script>

<style lang="css" scoped>
#userInfo{
    height: 300px;
    width:300px;
    background-color:red;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom:0;
    z-index: 9999;
}