<template>
  <div class="app">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" :badge="num === 0 ? null : num" text="购物车" @click="toCart" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart"/>
      <van-goods-action-button type="danger" text="立即购买" @click="buy"/>
    </van-goods-action>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  methods: {
    addCart () {
      this.makeShow()
      this.set()
    },
    buy () {
      this.makeShow()
      this.set()
    },
    ...mapMutations('cart', ['makeShow']),
    ...mapActions('cart', ['getCart']),
    toCart () {
      this.$router.push('/cart')
    }
  },
  computed: {
    ...mapState('cart', ['cart', 'show'])
  },
  props: {
    set: Function
  },
  data () {
    return {
      num: null
    }
  },
  created () {
    this.num = JSON.parse(localStorage.getItem('cart')).length
  }
}
</script>

<style scoped lang="less">
.app {
  z-index: 1000;
}

</style>
