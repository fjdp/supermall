<template>
  <div id="home">
    <navBar class="home-nav">
      <div slot="center">购物街</div>
    </navBar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <FeatureView></FeatureView>
    <tabControl @tabClick="hometabClick" class="tabcontr" :titles="['流行', '新款', '精选']"></tabControl>

    <good-list :goods="showGoodsList"></good-list>

  </div>
</template>

<script>
//组件
import navBar from "components/common/navbar/navBar";
import tabControl from "components/content/tabControl/tabControl";
import goodList from "components/content/goods/goodList";

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
    goodList
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
      control:'pop'
    };
  },
    computed: {
		  showGoodsList() {
		    return this.goodsList[this.control].list
      }
    },
  created() {
    //1,请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
        this.goodsList[type].list.push(...res.list)
        this.goodsList[type].page+=1
      });
    },
    hometabClick(index){
		    switch (index) {
          case 0:
            this.control = 'pop'
            break
          case 1:
            this.control = 'new'
            break
          case 2:
            this.control = 'sell'
            break
        }
    }
  }
};
</script>

<style>
/* #home {
  position: relative;
  height: 100vh;
} */

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.tabcontr {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
}
</style>