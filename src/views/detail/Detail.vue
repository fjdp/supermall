<template>
  <div>
    <detailnavbar></detailnavbar>
    <Detailswiper :topImages="topImages"></Detailswiper>
  </div>
</template>

<script>
import detailnavbar from "./childComps/DetailNavBar";
import Detailswiper from "./childComps/Detailswiper";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  components: {
    detailnavbar,
    Detailswiper
  },
  data() {
    return {
      iid: null,
      topImages:[]
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages
    });
  },
  methods: {}
};
</script>

<style>
</style>