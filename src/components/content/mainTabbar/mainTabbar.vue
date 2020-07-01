<template>
  <div>
    <tabBar>
      <tabBaritem path='/home' activeclolr='red'>
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
        <div slot="item-text">首页</div>
      </tabBaritem>
      <tabBaritem path='/category' activeclolr='yellow'>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt />
        <div slot="item-text">分类</div>
      </tabBaritem>
      <tabBaritem path='/cart' activeclolr='green'>
        <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt />
        <div slot="item-text">购物车</div>
      </tabBaritem>
      <tabBaritem path='/profile' activeclolr='blue'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt />
        <div slot="item-text">我的</div>
      </tabBaritem>
    </tabBar>
  </div>
</template>

<script>
import tabBar from "components/common/tabbar/tabBar";
import tabBaritem from "components/common/tabbar/tabBaritem";
export default {
  name: "mainTabbar",
  components: {
    tabBar,
    tabBaritem,
  }
}
</script>

<style>

</style>