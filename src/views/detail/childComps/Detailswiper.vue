<template>
    <swiper class="swiper_">
      <swiper-item v-for="(item, index) in topImages" :key="index">
          <img :src="item" alt/>
      </swiper-item>
    </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"
export default {
  name: "Detailswiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style  scoped>
.swiper_{
  height: 300px;
  overflow: hidden;
}
</style>
