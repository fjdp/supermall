<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="../../assets/img/tabbar/home.svg"/> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :class="{active:isActive}">
    <!-- <div :style="activestyle"> -->
      <slot name="item-text"></slot>
    </div>

    <!-- <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: "tabBaritem",
  //父传子
  props: {
    //指定属性,不是字符串
    path: String,
    activeclolr:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // tiele: ["首页", "分类", "购物车", "我的"]
      // isActive: true
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activestyle(){
      return this.isActive ? {color:this.activeclolr}:{}
    }
  },
  methods: {
    itemClick() {
      //路由跳转时,连续点击报错第一种解决办法  第二种index.js添加代码片段
      this.$router.replace(this.path).catch(err => err);
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 3px 0 2px 0;
  vertical-align: middle;
}
.active {
  color: red;
}
</style>