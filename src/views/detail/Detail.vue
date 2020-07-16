<template>
  <div id="detail">
    <detailnavbar class="detail_nav" @backTop="backTop" ref="nav" />

    <!-- class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
    @pullingUp="loadMore"-->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <Detailswiper :topImages="topImages" ref="swiper"></Detailswiper>
      <detail-base-info :goods="goods" ref="base"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" ref="goods"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list :goods="recommends" ref="recommend"></good-list>
      <!-- <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info> -->
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt />
    </back-top>
    <!-- <toast :message="message" :show="show"/> -->

  </div>
</template>

<script>
import detailnavbar from "./childComps/DetailNavBar";
import Detailswiper from "./childComps/Detailswiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

import Scroll from "components/common/scroll/Scroll";
// import Toast from 'components/common/toast/Toast'

import goodList from "components/content/goods/goodList";
import backTop from "components/content/backTop/backTop";

// import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

//防抖函数
import { debounce } from "_common/utils";
import { ItemImgListenerMixin } from "_common/mixin";
export default {
  name: "Detail",
  components: {
    detailnavbar,
    Detailswiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    backTop,
    DetailParamInfo,
    DetailCommentInfo,
    goodList,
    DetailBottomBar,
    // Toast
    // DetailRecommendInfo
  },
  data() {
    return {
      iid: null,
      showBackTop: false,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      tabOffsetTop: 0,
      themeTops: [],
      iSthemeTops: true,
      currentIndex: 0,
      // message:'',
      // show:false
    };
  },
  mixins: [ItemImgListenerMixin],
  created() {
    //判断IOS浏览器
    this.isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(
      res => {
        // 2.1.获取结果
        const data = res.result;

        // 2.2.获取顶部信息
        this.topImages = data.itemInfo.topImages;

        // 2.3.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );

        // 2.4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 2.5.获取商品信息
        this.detailInfo = data.detailInfo;

        // 2.6.保存参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 2.7.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      },
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommends = res.data.list;
      })
    );
  },
  updated() {
    // 获取需要的四个offsetTop
    this._getOffsetTops();
  },
  methods: {
    addToCart() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      // 3.添加到Store中
      console.log(obj)
      this.$store.commit("addCart", obj);
      // this.show = true,
      // this.message = '添加成功'
      // setTimeout(() => {
      //     this.show = false
      // }, 1500);
      this.$toast.show('添加购物车成功',1500)
      // this.$toast.show()
    },
    _getOffsetTops() {
      this.themeTops = [];
      // console.log(this.$refs.comment.$el.offsetTop)
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
    },
    backTop(index) {
       this.$refs.scroll.scrollTo(0, 0, 500);
      if (this.iSthemeTops) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index] + 44, 800);
        this.iSthemeTops = false;
      } else {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 800);
      }
    },
    contentScroll(scroll) {
      this.showBackTop = scroll.y < -950;
      const positionY = -scroll.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        // if(positionY > this.tnemeTops[i] && positionY < this.tnemeTops[i + 1]){
        //   console.log(i)
        // }
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] && positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  },
  mounted() {},
  destroyed: function() {
    //取消全局事件监听
    this.$bus.$off("itemImageload", this.ItemImgListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
}
.detail_nav {
  position: relative;
  background-color: #fff;
  z-index: 1;
}
</style>