<template>
  <div class="app">
    <div>
      <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="$router.go(-1) || $router.push('/my')" />
      <van-popup v-model="show" position="top" :style="{ height: '15%' }" style="text-align: center; line-height:100px" >{{ code.message+':'+code.code }}</van-popup>
      <UserFormLogin></UserFormLogin>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Login',
  methods: {

  },
  computed: {
    ...mapState('user', ['user', 'code'])
  },
  created () {
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    code () {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
