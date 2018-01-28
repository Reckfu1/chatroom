<template>
  <div id="app">
    
      <router-view class="animated fadeIn"></router-view>

  </div>
</template>

<script>
import '../node_modules/animate.css/animate.css'
export default {
    // data(){
    //     return {
    //         fadeRight:false,
    //         fadeLeft:false
    //     }
    // },
    // watch: {
    //     '$route' (to, from) {
    //         const toDepth = to.path.split('').length
    //         const fromDepth = from.path.split('').length
    //         this.fadeRight = toDepth > fromDepth ? true : false
    //         this.fadeLeft = toDepth < fromDepth ? true : false
    //         console.log(this.fadeRight,this.fadeLeft)
    //     }
    // }
}
</script>

<style>
#app {
  font-family: 'Open Sans','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width:100%;
}
/*.fade-enter-active, .fade-leave-active{
  transition: all .35s ease;
}
.fade-enter, .fade-leave-active{
  opacity :0;
}*/
/*.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to  {
  opacity: 0
}*/
</style>
