<template>
  <div id="home" class="wrapper">
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
    <!--滚动区域 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <FeatureView></FeatureView>
      <tabControl @tabClick="hometabClick" class="tabcontr" :titles="['流行', '新款', '精选']"></tabControl>
      <good-list :goods="showGoodsList"></good-list>
    </scroll>

    <!-- 组件添加原生点击事件,必须加上.native修饰符,才能监听点击 -->
    <backTop @backTop="backTop" v-show="backTopshow"></backTop>
  </div>
</template>

<script>
//组件
import navBar from "components/common/navbar/navBar";
import Scroll from "components/common/scroll/Scroll";

import tabControl from "components/content/tabControl/tabControl";
import goodList from "components/content/goods/goodList";
import backTop from "components/content/backTop/backTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
//请求
import { getHomeMultidata, getHomeGoods } from "network/home";

//函数调用 -->  压入函数栈(保存函数调用过程中所有变量)
//函数调用结束 -->  弹出函数栈(释放函数所有变量)
export default {
  name: "Home",
  components: {
    navBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    tabControl,
    goodList,
    Scroll,
    backTop
  },
  data() {
    return {
      banners: null,
      recommends: null,
      goodsList: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      control: "pop",
      backTopshow: false
    };
  },
  computed: {
    showGoodsList() {
      return this.goodsList[this.control].list;
    }
  },
  created() {
    //1,请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.banner.list;
        this.recommends = res.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goodsList[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //数据合并
        this.goodsList[type].list.push(...res.list);
        //请求之后页数加一
        this.goodsList[type].page += 1;
      });
    },
    hometabClick(index) {
      switch (index) {
        case 0:
          this.control = "pop";
          break;
        case 1:
          this.control = "new";
          break;
        case 2:
          this.control = "sell";
          break;
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(scroll) {
      this.backTopshow = scroll.y > -950 ? false : true;
    },
    loadMore() {
      this.getHomeGoods(this.control);
      //发送请求完毕,继续下次下拉刷新 ==>请求数据之后可,开始请求之前可
      this.$refs.scroll.finscroll();
    }
  }
};
</script>

<style scoped>
#home {
  /* position: relative; */
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.tabcontr {
  top: 0px;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>