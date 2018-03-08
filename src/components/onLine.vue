<template>
    <div id="online">
        <div class="person">
            <div class="person-detail">
                <img class="person-img" src="../assets/me.jpg"></img>
                <div class="person-profile">
                    <div class="person-name">Zeki Ghuliam</div>
                    <div class="person-info">前端工程师</div>
                </div>
            </div>
            <div class="person-options">
                <!-- sort / format align left/menu -->
                <mu-icon value="sort" :size="28" color="#fff" @click="modifyInfo" style="user-select:none"/>
            </div>
        </div>
        <div class="online-people">
            <span class="available">AVAILABLE NOW</span>
            <div class="online-detail">
                <img src="../assets/me.jpg">
                <div class="people-wrapper">
                    <span class="people-name">Kanye WestKanye WestKanye W</span>
                    <!-- brightness 1 -->
                    <mu-icon value="brightness_1" :size="12" color="green" class="online-sign"/>
                </div>
            </div>
        </div>
        <user-info :message="userInfoPopup" @listenInUserInfoStatus="changeStatus" class="animated fadeIn"></user-info>
    </div>
</template>

<script>
import userInfo from './userInfo'
export default {
    data(){
        return {
            userInfoPopup:false
        }
    },
    methods:{
        modifyInfo(){
            this.userInfoPopup=true
        },
        changeStatus(){
            this.userInfoPopup=false
        }
    },
    components:{
        'user-info':userInfo
    }    
}
</script>

<style lang="css" scoped>
#online{
    width:22%;
    height: 600px;
    background-color: #ebf1f6;
    box-shadow: -1px 0 5px rgba(0,0,0,.1);
    z-index: 1000;
}
/*person*/
.person{
    height: 95px;
    width:100%;
/*    position: absolute;
    top:0;*/
    /*background-color: red;*/
    display: flex;
}
.person-detail{
    height: 80px;
    width:75%;
    background-color: #7b7eae;
    display: flex;
    justify-content: center;
    align-items: center;
}
.person-options{
    height: 80px;
    width:25%;
    background-color: #868abb;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.person-img{
    height: 38px;
    width:38px;
}
.person-profile{
    height: 40px;
    width:60%;
    /*background-color: red;*/
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    left: 8px;
}
.person-name,.person-info{
    /*超出文字显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.person-name{
    font-weight: bold;
    font-size: 14px;
}
.person-info{
    font-size: 12px;
    font-weight: 300;
    opacity: .8;
}

/*online people*/
.online-people{
    height: 505px;
    width:100%;
}
.available{
    font-size: 12px;
    color:gray;
    position: relative;
    left: 17px;
}
.online-detail{
    margin-top:15px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.online-detail img{
    height: 25px;
    width:25px;
    /*border-radius: 50%;*/
}
.people-wrapper{
    height: 25px;
    width:76%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    /*background-color: red;*/
}
.people-name{
    position: relative;
    left: 10px;
    width:120px;
    font-size: 12px;
    /*超出文字显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.online-sign{
    position: relative;
    right:10px;
}
</style>