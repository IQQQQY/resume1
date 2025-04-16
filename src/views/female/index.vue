<template>
  <!-- 女装视图 -->
  <div class="app">
    <!--
      头部导航组件
      功能：
      - logo点击跳转首页
      - 购物车查看
      - TODO：搜索框搜索商品
    -->
    <HeadBar></HeadBar>
    <h3>女装</h3>
    <!--
      商品分类组件
      功能：
      - TODO：点击不同分类展示不同种类商品
    -->
    <TabNav :Fn="getFemale"></TabNav>
  </div>
</template>

<script>
/**
 * 女装视图
 * @displayName NavFemale
 * @methods {Function} getFemale - 获取女装分类列表
 * @computed {Array} female - 女装分类列表
 * TODO：
 * - 实现四种不同分类的商品展示
 */
import { mapActions, mapState } from 'vuex'
export default {
  name: 'NavFemale',
  created () {
    this.getFemale()
  },
  methods: {
    ...mapActions('female', ['getFemale'])
  },
  computed: {
    ...mapState('female', ['female'])
  }
}
</script>

<style scoped lang="less">
.app {
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  h3 {
    font-size: 30px;
    text-align: center;
    margin-top: 10px 0;
    padding-top: 50px;
  }
}
</style>
