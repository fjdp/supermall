<template>
  <div>
    <navBar>
      <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg" />
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="item"
          class="title-item"
          :class="{active: currentIndex === index}"
          @click="itemClick(index)"
        >{{item}}</div>
      </div>
    </navBar>
  </div>
</template>

<script>
import navBar from "components/common/navbar/navBar";
export default {
  name: "DetailNavBar",
  components: {
    navBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("backTop",index)
    },
    backClick() {
      this.$router.back();
    },
  }
};
</script>

<style  scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back {
  margin-top: 12px;
}
</style>
