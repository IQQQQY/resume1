<template>
  <div class="app">
    <van-form>
      <van-cell-group inset>
        <van-field type="tel" label="手机号" placeholder="请输入手机号" required v-model="phoneNumber"
          :error="this.phoneNumber === ''" />
        <van-field center clearable label="短信验证码" placeholder="请输入短信验证码" required v-model="myCode"
          :error="this.myCode === ''">
          <template #button>
            <van-button size="small" type="primary" @click="sendCode"><span v-if="flag === true">获取验证码</span><span
                v-else>{{ num }}秒后重新获取</span></van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-button class="button" type="primary" size="large" block @click="log">手机号快捷登录</van-button>
    </van-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['user', 'code']),
    safeUser () {
      return this.user || []
    },
    num: {
      get () {
        return this.internalNum
      },
      set (val) {
        this.internalNum = val
      }
    }
  },
  methods: {
    ...mapActions('user', ['login', 'verCode', 'currentUser']),
    log () {
      this.login({
        phoneNumber: this.phoneNumber,
        code: this.myCode
      }).then(res => {
        this.$toast(res.data.message)
        this.$router.push({
          path: '/my',
          query: {
            uploader: res.data.data.uploader,
            userName: res.data.data.userName,
            totalAssets: res.data.data.totalAssets,
            phoneNumber: res.data.data.phoneNumber
          }
        })
        localStorage.setItem('msg', JSON.stringify({ uploader: res.data.data.uploader, userName: res.data.data.userName, totalAssets: res.data.data.totalAssets, phoneNumber: res.data.data.phoneNumber }))
      }).catch(err => {
        console.log(err)
        this.$toast(err.response.data.message)
      })
    },
    sendCode () {
      if (!this.timer) {
        this.verCode({
          phoneNumber: this.phoneNumber
        })
        this.$toast('验证码已发送')
        this.flag = false
        this.timer = setInterval(() => {
          this.internalNum--
          if (this.internalNum === 0) {
            this.flag = true
            this.internalNum = 60
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  },
  data () {
    return {
      phoneNumber: '',
      myCode: '',
      timer: null,
      flag: true,
      internalNum: 60
    }
  },
  created () {
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.app {
  .van-form {
    .van-cell-group {
      .van-cell {
        margin-top: 20px;

        .van-button {
          display: block;
          margin: 0;
        }
      }
    }
  }

  .van-button {
    display: block;
    margin-top: 20px;
  }
}
</style>
