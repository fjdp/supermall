<template>
  <div class="goods">
     <good-list-item v-for="(item,index) in goods" :key='index' :goods-item="item"/>
  </div>
</template>

<script>
import goodListItem from "./goodListItem";
export default {
  components:{
    goodListItem
  },
  name:'goodList',
  props:{
    goods:{
      type:Array,
      default:[]
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style  scoped>
.goods{
  display: flex;
  flex-wrap:wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
