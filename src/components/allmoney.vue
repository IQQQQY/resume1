<template>
  <div class="app">
    <van-row>
      <van-col span="10">
        <van-cell title="我的总资产" is-link />
        <span class="price">￥{{ totalAssets }}</span>
      </van-col>
      <van-col span="7">
        <van-cell title="红包" is-link />
        <span class="price">￥0.00</span>
      </van-col>
      <van-col span="7">
        <van-cell title="优惠券" is-link />
        <span class="price">￥0.00</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created () {
    this.totalAssets = JSON.parse(localStorage.getItem('msg')).totalAssets / 100 || null
  },
  data () {
    return {
      tatoalAssets: 0
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-row {
    padding: 10px;
    background-color: gray;
    .van-col {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .price {
        font-size: 20px;
        color: white;
        display: block;
      }

      .van-cell {
        height: 20px;
        background-color: gray;
        .van-cell__title {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 3vw;
            color: white;
          }
        }
      }
    }
  }
}
</style>
