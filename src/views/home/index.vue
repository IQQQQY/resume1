<template>
  <!-- 首页视图 -->
  <div class="app">
    <!--
      头部组件
      功能：
      - 显示logo
    -->
    <HeadBar></HeadBar>
    <!--
      轮播图组件
      功能：
      - 图片自动轮播
      - 滑动切换图片
    -->
    <Slider :images="images"></Slider>
    <!--
      模块导航栏
      功能：
      - 点击跳转对应路由
    -->
    <Layout></Layout>
    <!--
      侧边栏组件
      功能：
      - TODO：点击切换商品分类
    -->
    <SideNav :list="all"></SideNav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
/**
 * 首页视图
 * @displayName NavHome
 * @data {Array} images - 轮播图图片
 */
export default {
  name: 'NavHome',
  data () {
    return {
      // 轮播图图片数据
      images: ['http://localhost:3000/uploads/slider0.png', 'http://localhost:3000/uploads/slider1.png', 'http://localhost:3000/uploads/slider2.png']
    }
  },
  created () {

  },
  computed: {
    ...mapState('all', ['all'])
  },
  methods: {
    ...mapActions('all', ['getAll'])
  }
}
</script>

<style scoped lang="less"></style>
