<template>
  <div class="app">
    <van-cell title="我的订单" is-link />
    <van-grid>
      <van-grid-item to="/" icon="bill-o" text="待付款" />
      <van-grid-item to="/" icon="send-gift-o" text="待发货" />
      <van-grid-item to="/" icon="logistics" text="待收货" />
      <van-grid-item to="/" icon="chat-o" text="待评价" />
      <van-grid-item to="/" icon="after-sale" text="退款/售后" />
    </van-grid>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.app {
  .van-cell {
        height: 35px;
      }
  .van-grid {
    display: flex;
    flex-wrap: nowrap;
    .van-grid-item__text {
        font-size: 2.8vw;
    }
  }
}
</style>
