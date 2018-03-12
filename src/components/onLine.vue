<template>
    <div id="online">
        <div class="person">
            <div class="person-detail">
                <img class="person-img" src="../assets/me.jpg"></img>
                <div class="person-profile">
                    <div class="person-name">{{name}}</div>
                    <div class="person-info">{{profession}}</div>
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
                    <span class="people-name">Kanye WestKa</span>
                    <!-- brightness 1 -->
                    <mu-icon value="brightness_1" :size="12" color="green" class="online-sign"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name:'',
            profession:''
        }
    },
    methods:{
        // 这个userInfo组件的显示实现方法不同于loginPopup组件
        // 要利用一个中间事件来完成显示信息框，因为userInfo组件不在这里，而是在room.vue
        // 所以点击后先触发middleEvent，然后在room.vue中的onLine组件(也就是此组件)里监听middleEvent，再修改信息框状态，完成显示
        // onLine.vue -> room.vue -> userInfo.vue
        modifyInfo(){
            this.$emit('middleEvent')
        }
    },
    // 必须用mounted，因为要用到this
    mounted(){
        // 获取用户名和职业
        this.axios.post('/auth/getinfo',{
            token:localStorage.getItem("token")
        })
        .then(res => {
            if(res.data.get_userinfo){
                this.name=res.data.result.user_name,
                this.profession=res.data.result.user_profession
            }
        })
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
    height: 45px;
    width:45px;
    border-radius: 50%;
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
.person-name,.person-info{
    user-select: none;
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
    user-select: none;
    cursor: pointer;
}
.online-sign{
    position: relative;
    right:10px;
    user-select: none;
}
</style>