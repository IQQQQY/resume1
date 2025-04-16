<template>
  <div class="app">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#ee0a24" >
      <van-tabbar-item replace :to="{path: item.path, name: item.name}" :icon="item.icon" v-for="item in routes" :key="item.active" @click="store(item.active)">{{item.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'FirstBar',
  data () {
    return {
      active: 0,
      routes: [
        { path: '/home', active: 0, icon: 'home-o', title: '首页' },
        { path: '/female', active: 1, icon: 'flower-o', title: '女装' },
        { path: '/male', active: 2, icon: 'user-o', title: '男装' },
        { path: '/bag', active: 3, icon: 'bag-o', title: '箱包' },
        { path: '/my', active: 4, icon: 'contact-o', title: '我的' }
      ]
    }
  },
  watch: {
    $route (to) {
      switch (to.path) {
        case '/home':
          this.active = 0
          break
        case '/female':
          this.active = 1
          break
        case '/male':
          this.active = 2
          break
        case '/bag':
          this.active = 3
          break
        case '/my':
          this.active = 4
          break
        default:
          this.active = 0
      }
    }
  },
  methods: {
    store (id) {
      localStorage.setItem('active', id)
    }
  },
  // 页面加载完成后，获取本地存储的active值，为数字类型
  created () {
    this.active = Number(localStorage.getItem('active'))
  }
}
</script>

<style lang="less" scoped>
.app {
  margin-bottom: 100px;
}
</style>
