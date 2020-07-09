<template>
  <div class="wrapper">
    <ul class="content">
      <li>分类1</li>
      <li>分类2</li>
      <li>分类3</li>
      <li>分类4</li>
      <li>分类5</li>
      <li>分类6</li>
      <li>分类7</li>
      <li>分类8</li>
      <li>分类9</li>
      <li>分类10</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  created() {},
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      // 0,1都是不进行实时侦测

      // 2 在手指滚动的过程中侦测，手指离开后的惯性滚动不进行侦测

      // 3 只要是在滚动 都侦测
      probeType: 3,
      pullUpLoad: true, //监听上拉加载
      click: true
    });
    this.scroll.on("pullingUp", () => {
      // console.log("===");
      this.scroll.finishPullUp(); //当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
    });

    this.scroll.on("scroll", position => {
      // console.log(position);
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>