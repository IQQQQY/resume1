<template>
  <div class="app">
    <van-row>
      <van-col span="3">
        <router-link to="/home"><van-image width="10vw" height="10vw" src="http://localhost:3000/uploads/logo.png" /></router-link>
      </van-col>
      <van-col span="14"><van-search v-model="value" show-action placeholder="请输入搜索关键词" @focus="goSearch"/></van-col>
      <van-col span="3">
        <router-link to="/cart">
          <van-badge :content="num === 0 ? null : num"><van-icon name="shopping-cart-o" /></van-badge>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'HeadBar',
  data () {
    return {
      value: '',
      num: 0
    }
  },
  computed: {
    safeCart () {
      return this.cart.cart || []
    }
  },
  created () {
    this.num = JSON.parse(localStorage.getItem('cart')).length || 0
  },
  methods: {
    goSearch () {
      this.$router.push('/search')
    }
  }
}
</script>
<style lang="less" scoped>
.app {
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  .van-row {
    display: flex;
    justify-content: space-around;

    .van-col {
      display: flex;
      align-items: center;
      justify-content: center;
      .van-search {
        .van-cell {
          height: 35px;
        }
      }
      .van-icon {
        font-size: 5vw;
      }

      .van-search__content {
        border-bottom-left-radius: 10px;
        border-top-left-radius:10px;
      }

      .van-search__action {
        font-size: 12px;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        background-color: red;
        color: white;
      }
    }
  }
}
</style>
