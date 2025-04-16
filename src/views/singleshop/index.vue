<template>
  <div class="app">
    <van-nav-bar left-arrow @click-left="$router.go(-1) || $router.push('/home')" />
    <div v-if="loading">
      <van-skeleton avatar avatar-shape="square" :loading="loading"></van-skeleton>
      <van-skeleton row="10" title title-width="80%" style="margin-top: 10px;"></van-skeleton>
    </div>
    <div v-else>
      <ShopListChose></ShopListChose>
      <ShopList></ShopList>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('cart', ['show'])
  },
  methods: {
    ...mapMutations('cart', ['makeShow', 'makeHide'])
  },
  created () {
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    background-color: white
  }
  .van-skeleton {
    margin-top: 50px;
    .van-skeleton__avatar {
      width: 100%;
      height: 350px;
    }
    .van-skeleton__title {
      height: 25px;
    }
  }
}
</style>
