<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <mainTabbar></mainTabbar>
        <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import mainTabbar from "components/content/mainTabbar/mainTabbar";
  import Icon from 'content/Icon/Icon.vue'
  import SvgIcon from 'content/Icon/svg.vue'
// import Home from "./views/home/Home";
export default {
  name: "App",
  components: {
    mainTabbar,
    Icon,
    SvgIcon 
  }
};
</script>

<style>
@import "~assets/css/base.css";
</style>
