<template>
  <div class="app">
    <van-row>
      <van-col span="10"><router-link to="/login">
          <van-image round width="10vw" height="10vw" :src="msg.uploader" /><span>{{ msg.userName }}</span>
        </router-link></van-col>
      <van-col span="6"><router-link to="/login">
          登录/切换账号
        </router-link></van-col>
      <van-col span="4"><router-link to="/register">
          注册
        </router-link></van-col>
      <van-col span="4" @click="exit"><a>
        登出
      </a>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  methods: {
    exit () {
      localStorage.setItem('msg', JSON.stringify({ uploader: 'https://img.yzcdn.cn/vant/user-inactive.png', userName: '未登录' }))
      this.$router.push('/login')
    }
  },
  data () {
    return {
      msg: []
    }
  },
  created () {
    this.msg = JSON.parse(localStorage.getItem('msg')) || { uploader: 'https://img.yzcdn.cn/vant/user-inactive.png', userName: '未登录' }
  }
}
</script>

<style scoped lang="less">
.app {
  padding: 10px;
  border-bottom: 1px solid #cececeee;

  .van-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .van-col {
      display: flex;
      justify-content: center;
      text-align: center;

      &:nth-child(1) {
        justify-content: start;
      }
      a {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: black;
      }
    }
  }
}
</style>
