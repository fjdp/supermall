import {POP, NEW, SELL} from "./const";

export const backTopMixin = {
  data: function () {
    return {
      showBackTop: false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}

import { debounce } from "_common/utils";
export const ItemImgListenerMixin = {
  data() {
    return {
      ItemImgListener: null
    };
  },
  mounted() {
    //图片加载完毕
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //对事件保存
    this.ItemImgListener = () => {
      //return 可去
       refresh();
    };
    this.$bus.$on("itemImageload", this.ItemImgListener);
  },
}