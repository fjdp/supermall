<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 0,1都是不进行实时侦测
      // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动不进行侦测
      // 3 只要是在滚动 都侦测
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad, //监听上拉加载
      click: true
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      //  this.scroll.finishPullUp(); //当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    });

    this.scroll.on("scroll", position => {
      //获取滚动高度
      // console.log(position);
      //传出事件
      this.$emit("scroll", position);
    });
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finscroll() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    },
    getscrollY(){
      return this.scroll ? this.scroll.y : 0 
    }
  }
};
</script>

<style  scoped>
</style>
