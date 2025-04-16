<template>
  <!-- 我的视图 -->
  <div class="app">
    <!--
      用户登录组件
      功能：
      - 点击登录按钮跳转登录页面
      - 点击登出按钮跳转注册页面
      - TODO：登录成功显示用户头像和昵称
      - TODO：未登录不显示默认昵称和头像
    -->
    <div v-if="loading">
      <van-skeleton avatar avatar-size="40px" title title-width="80%" row="0"></van-skeleton>
      <van-skeleton row="3"></van-skeleton>
      <van-skeleton title title-width="80%" row="20"></van-skeleton>
      <van-skeleton row="3"></van-skeleton>
    </div>
    <div v-else>
      <UserManage></UserManage>
      <AllMoney></AllMoney>
      <MyOrder></MyOrder>
    </div>
    <!--
      用户财产组件
      功能：
      - TODO：实时显示用户的账户金额，优惠券，积分等信息
    -->

    <!--
      用户订单组件
      功能：
      - TODO：点击待付款跳转到购物车页面
      - TODO：点击待评价跳转到评价页面
      - TODO：实时更新订单状态
      -->
    <!--
      推荐商品组件
      功能：
      - 点击不同分类推荐不同商品
    -->

    <Recommend></Recommend>

  </div>
</template>

<script>
/**
 * 我的视图
 * @displayName NavMy
 */
export default {
  name: 'NavMy',
  mounted () {
    this.loading = false
  },
  data () {
    return {
      loading: true
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-skeleton {
    margin-top: 12px;
  }

  .van-skeleton__title {
    width: 80%;
  }

  .van-skeleton__content {
    padding-top: 4px;

    .van-skeleton__row {
      width: 120%;
    }
  }
}
</style>
