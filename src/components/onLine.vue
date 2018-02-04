<template>
    <div id="online">
        <div class="person">
            <div class="person-detail">
                <img class="person-img" src="../assets/josh-felise-79991.jpg"></img>
                <div class="person-name">reckful</div>
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
    height: 95px;
    width:75%;
    background-color: #7C7EAF;
    display: flex;
    justify-content: center;
    align-items: center;
}
.person-options{
    height: 95px;
    width:25%;
    background-color: #868abb;
    display: flex;
    justify-content: center;
    align-items: center;
}
.person-img{
    height: 30px;
    width:30px;
}
.person-name{

}
</style>