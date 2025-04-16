<template>
  <!-- 男装视图 -->
  <div class="app">
    <!--
      头部导航组件
      功能：
      - logo点击跳转首页
      - 购物车路由跳转
      - TODO：搜索框搜索商品 -->
    <HeadBar></HeadBar>
    <h3>男装</h3>
    <!--
      男装分类导航组件
      功能：
      - TODO：点击切换不同分类
    -->
    <TabNav :Fn="getMale"></TabNav>
  </div>
</template>

<script>
/**
 * 男装模块
 * @displayName NavMale
 * @computed {Array} male - 男装分类列表
 * @methods {Function} getMale - 获取男装分类列表
 */
import { mapState, mapActions } from 'vuex'
export default {
  name: 'NavMale',
  data () {
    return {
    }
  },
  created () {
    this.getMale()
  },
  computed: {
    ...mapState(['male', 'male'])
  },
  methods: {
    ...mapActions('male', ['getMale'])
  }
}
</script>

<style scoped lang="less">
.app {
  h3 {
    font-size: 30px;
    text-align: center;
    margin-top: 10px 0;
    padding-top: 50px;
  }
}
</style>
