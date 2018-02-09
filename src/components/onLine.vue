<template>
    <div id="online">
        <div class="person">
            <div class="person-detail">
                <img class="person-img" src="../assets/me.jpg"></img>
                <div class="person-profile">
                    <div class="person-name">Zeki Ghuliam</div>
                    <div class="person-info">UI/UX Designer</div>
                </div>
            </div>
            <div class="person-options">
                <!-- sort / format align left/menu -->
                <mu-icon value="sort" :size="28" color="#fff"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
#online{
    width:22%;
    height: 600px;
    background-color: #ebf1f6;
    box-shadow: -1px 0 5px rgba(0,0,0,.1);
    position: relative;
}
/*person*/
.person{
    height: 95px;
    width:100%;
    position: absolute;
    top:0;
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
}
.person-img{
    height: 38px;
    width:38px;
}
.person-profile{
    height: 46px;
    width:60%;
    /*background-color: red;*/
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    left: 8px;
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

</style>