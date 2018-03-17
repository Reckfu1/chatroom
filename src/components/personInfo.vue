<template>
    <div id="personInfo" @click.self="hidePersonInfo" v-if="togglePersonInfo">
        <section>
            <div class="person-info-box">
                <div class="circle">
                    <img :src="src" alt="">
                </div>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="Sex" labelFloat v-model="value.sex_value" disabled/>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="Profession" labelFloat v-model="value.pro_value" disabled/>
                <mu-text-field labelClass="info-common-label" class="info-common-class" underlineFocusClass="info-common-focus-underline" labelFocusClass="info-common-focus-label" label="Hobby" labelFloat v-model="value.hobby_value" disabled/>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            togglePersonInfo:false,
            personName:'',
            src:'',
            value:{
                sex_value:'',
                pro_value:'',
                hobby_value:''
            }
        }
    },
    props:['message','name'],
    methods:{
        hidePersonInfo(){
            this.togglePersonInfo=false
            this.$emit('listenInPersonInfoStatus')
        }
    },
    // created(){
    //     // 获取信息(sex,profession,hobby)
    //     console.log('name:',this.personName)
    //     this.axios.get(`/auth/getinfobyname?name=${this.personName}`)
    //     .then(res => {
    //         if(res.data.get_userinfo){
    //             let temp=res.data.result
    //             this.value.sex_value=temp.user_sex
    //             this.value.pro_value=temp.user_profession
    //             this.value.hobby_value=temp.user_hobby
    //             this.src=temp.avatar_url
    //         }
    //     })
    // },
    watch:{
        name(){
            this.personName=this.name
        },
        message(){
            if(this.message){
                this.togglePersonInfo=true
                // console.log('name:',this.personName)
                this.axios.get(`/auth/getinfobyname?name=${this.personName}`)
                .then(res => {
                    if(res.data.get_userinfo_byname){
                        let temp=res.data.result
                        this.value.sex_value=temp.user_sex
                        this.value.pro_value=temp.user_profession
                        this.value.hobby_value=temp.user_hobby
                        this.src=temp.avatar_url
                    }
                })
            }
        }
    }
}
</script>

<style lang="css">
#personInfo{
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
.person-info-box{
    height: 400px;
    width:270px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.circle{
    height: 60px;
    width:60px;
    border:1px solid rgba(0,0,0,.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.circle img{
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
</style>