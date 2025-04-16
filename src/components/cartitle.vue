<template>
  <div class="app">
    <van-row>
      <van-col span="8">
        <van-cell title="我的购物车" is-link />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.app {
  .van-row {
    display: flex;
    align-items: center;
    .van-col {
      margin-left: 0;
    }
    .van-cell {
      padding: 0;
      display: flex;
      align-items: center;
      height: 20px;
      .van-cell__title {
        span {
          font-size: 17px;
        }
      }
    }
  }
}
</style>
