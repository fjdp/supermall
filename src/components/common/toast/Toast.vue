<template>
  <div class="toast"  v-show="iSshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data () {
    return {
      message:'',
      iSshow:false
    }
  }, 
  methods:{
    // show(message = '默认值',duration = 2000){
      // duration = duration || 2000 
    show(message,duration){
      this.iSshow = true
      this.message = message
      setTimeout(() => {
        this.iSshow = false
        this.message = ''
      }, duration);
    }
  }
}
</script>

<style  scoped>
.toast{
  position: fixed;
  top:50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  background: rgba(0, 0, 0,.7);
  color: white;
  z-index: 2;
}
</style>
