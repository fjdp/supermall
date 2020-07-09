<template>
  <swiper >
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
	export default {
		name: "HomeSwiper",
    components: {
		  Swiper,
      SwiperItem
    },
    props: {
		  banners: {
		    type: Array,
        default(){
          return []
        } 
      }
    },
    data () {
      return {
        isLoad:true  
      }
    },
    methods: {
      imageLoad(){
        if(this.isLoad){

        // 只计算一次image的高度,或者再home里接受事件swiperimageload.once
        this.$emit("swiperimageload")
        this.isLoad = false
        }
      }
		  // stopTimer() {
		  //   this.$refs.swiper.stopTimer()
      // },
      // startTimer() {
		  //   if (this.$refs.swiper) {
      //     this.$refs.swiper.startTimer()
      //   }
      // }
    }
	}
</script>

<style scoped>

</style>
