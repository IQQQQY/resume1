<template>
  <div class="app">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" v-model="active">
      <van-swipe-item v-for="item in images" :key="item"><img :src="item" alt=""></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  props: {
    images: Array
  }
}
</script>

<style lang="less" scoped>
.app {
  padding-top: 50px;
  .my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 0px;
    text-align: center;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
}
</style>
