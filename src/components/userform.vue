<template>
  <div class="app">
    <van-form>
      <van-cell-group inset>
        <van-field name="uploader" label="头像设置">
          <template #input>
            <van-uploader v-model="uploader" />
          </template>
        </van-field>
        <van-field label="用户名" placeholder="请输入用户名" required :error="userName === ''" v-model="userName" />
        <van-field type="tel" label="手机号" placeholder="请输入手机号" required :error="phoneNumber === ''"
          v-model="phoneNumber" />
        <van-field center clearable label="短信验证码" placeholder="请输入短信验证码" required v-model="myCode"
          :error="myCode === ''">
          <template #button>
            <van-button size="small" type="primary" @click="sendCode"><span v-if="flag === true">获取验证码</span><span
                v-else>{{ num }}秒后重新获取</span></van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-button class="button" type="primary" size="large" block @click="reg">注册</van-button>
    </van-form>
  </div>
</template>

<script>
// import { jl } from '@/utils/index'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      userName: '',
      phoneNumber: '',
      myCode: '',
      timer: null,
      flag: true,
      internalNum: 60
    }
  },
  computed: {
    ...mapState('user', ['user', 'code']),
    safeUser () {
      return this.user || []
    },
    safecurrentCode () {
      return this.currentCodu || {}
    },
    num: {
      get () {
        return this.internalNum
      }
    }
  },
  methods: {
    ...mapActions('user', ['verCode', 'register']),
    reg () {
      this.register({
        userName: this.userName,
        phoneNumber: this.phoneNumber,
        code: this.myCode,
        img: this.uploader
      }).then(res => {
        this.$toast(res.data)
        this.$router.push('/login')
      }).catch(err => {
        this.$toast.fail(err.response.data || '请输入完整数据')
        console.log(err)
      })
    },
    // 小节流
    sendCode () {
      console.log(Boolean(this.timer))
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
        &:nth-child(1) {
          height: 100px;
        }

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
    margin-top: 100px;
  }
}
</style>
