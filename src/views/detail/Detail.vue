<template>
  <div id="detail">
    <detailnavbar class="detail_nav" />
    <!-- class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
    @pullingUp="loadMore"-->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <Detailswiper :topImages="topImages"></Detailswiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <!-- <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>-->
    </scroll>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt />
    </back-top>
  </div>
</template>

<script>
import detailnavbar from "./childComps/DetailNavBar";
import Detailswiper from "./childComps/Detailswiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

import backTop from "components/content/backTop/backTop";
import DetailParamInfo from "./childComps/DetailParamInfo";
// import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

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
    DetailParamInfo
    // DetailCommentInfo,
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
      paramInfo: {}
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
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
    });
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(scroll) {
      this.showBackTop = scroll.y > -950 ? false : true;
    },
    imageLoad() {
      this.$refs.scroll.refresh();
    }
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
  height: calc(100% - 44px);
}
.detail_nav {
  position: relative;
  background-color: #fff;
  z-index: 1;
}
</style>