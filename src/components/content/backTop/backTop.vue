<template>
  <div class="back-top" @click="topClick">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {};
  },
  methods: {
    topClick: function() {
      this.$emit("backTop");
    }
  }
};
</script>

<style  scoped>
.back-top img {
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 43px;
  height: 43px;
}
</style>
