<template>
  <!-- 购物车视图 -->
  <div class="app">
    <!--
      购物车头部组件
      功能：
      - 点击左箭头返回上级路由
      - TODO：搜索框搜索购物车商品
    -->
    <van-nav-bar left-text="返回" left-arrow @click-left="$router.go(-1) || $router.push('/home')">
      <template #right>
        <van-search placeholder="请输入搜索关键词" />
      </template>
    </van-nav-bar>
    <div v-if="loading">
      <van-skeleton title title-width="40%"></van-skeleton>
      <van-skeleton avatar avatar-shape="square" avatar-size="80px" style="flex-direction: column; align-items:center"
        v-if="cart.length === 0"></van-skeleton>
      <div v-else>
        <van-skeleton avatar avatar-size="80px" avatar-shape="square" row="2" v-for="item in cart" :key="item.id"></van-skeleton>
      </div>
      <van-skeleton row="3" style="position:fixed; bottom:0; left:0; width:100%;"></van-skeleton>
    </div>
    <div v-else>
      <!-- 购物车标题组件 -->
      <CartTitle></CartTitle>
      <!--
      购物车列表组件
      功能：
      - 显示购物车列表
      - 当购物车为空时，显示空车组件
      - TODO：点击复选框动态计算总价
    -->
      <CartList v-for="item in safeCart" :key="item.productId" :img="item.img" :name="item.name" :price="item.price"
        :color="item.color" :size="item.size" :quantity="item.quantity" :other="item.other" :id="item.productId"
        :checked="checked" @change="handlerChange" @add="handlerAdd" >
      </CartList>
      <!--
      空车组件
      功能：
      - 当购物车为空时，显示该组件
    -->
      <CartEmpty v-show="safeCart.length == 0"></CartEmpty>
      <!--
      购物车结算组件
      功能：
      - TODO：动态计算购物车总价
      - TODO：全选按钮功能 -->
      <van-submit-bar :price="safeTotalPrice" button-text="提交订单" @submit="payOrder">
        <van-checkbox v-model="selectAll" @click="select">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送, <span>修改地址</span>
        </template>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
/**
 * 购物车视图
 * @displayName cart
 * @computed {Array} cart - 购物车列表
 * @method {Function} getCart - 获取购物车列表
 */
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Bus from '@/utils/eventBus'
export default {
  computed: {
    ...mapState('cart', ['cart']),
    safeCart () {
      return this.cart || []
    },
    ...mapGetters('cart', ['totalPrice']),
    safeTotalPrice: {
      get () {
        return this.totalPrice === 0.00 ? JSON.parse(localStorage.getItem('totalPrice')) : this.totalPrice
      },
      set (val) {
        localStorage.setItem('totalPrice', val)
      }
    },
    selectAll: {
      get () {
        return this.checked.length === JSON.parse(localStorage.getItem('cart')).length
      },
      set (value) {
        if (value) {
          // 如果全选框被选中，设置所有子复选框为选中状态
          this.checked = JSON.parse(localStorage.getItem('cart')).map(item => item.productId)
        } else {
          // 如果全选框被取消选中，清除所有子复选框的选中状态
          this.checked = []
        }
      }
    }
  },
  methods: {
    ...mapActions('cart', ['getCart', 'deleteCart']),
    ...mapMutations('cart', ['getSelectCart']),
    handlerChange (data) {
      if (this.checkedList.length <= this.cart.length && this.checked.length === this.checkedList.length) {
        if (!this.checked.includes(data)) {
          this.checked.push(data)
          this.checkedList.push(this.cart.find(item => item.productId === data))
        } else {
          this.checked.splice(this.checked.indexOf(data), 1)
          this.checkedList.splice(this.checkedList.findIndex(item => item.productId === data), 1)
        }
      } else {
        this.checkedList = this.cart.filter(item => this.checked.includes(item.productId))
      }
      localStorage.setItem('selectCart', JSON.stringify(this.checked))
      localStorage.setItem('selectList', JSON.stringify(this.checkedList))
      this.getSelectCart(this.checkedList)
    },
    handlerAdd (val) {
      this.checked.push(JSON.parse(localStorage.getItem('cart')).find(item => item.productId === val))
    },
    payOrder () {
      this.needPayMoney = this.safeTotalPrice
      this.currentMoney = JSON.parse(localStorage.getItem('msg')).totalAssets
      this.lastMoney = this.currentMoney - this.needPayMoney
      if (this.currentMoney < this.needPayMoney) {
        this.$toast.fail('余额不足')
      } else {
        this.toDeleteCartList = JSON.parse(localStorage.getItem('cart')).map(item => {
          return { productId: item.productId, size: item.size }
        })
        console.log(this.toDeleteCartList)
        this.deleteCart({
          phoneNumber: JSON.parse(localStorage.getItem('msg')).phoneNumber,
          products: this.toDeleteCartList
        }).then(() => {
          localStorage.setItem('msg', JSON.stringify({
            totalAssets: this.lastMoney,
            phoneNumber: JSON.parse(localStorage.getItem('msg')).phoneNumber,
            userName: JSON.parse(localStorage.getItem('msg')).userName
          }))
          this.$toast.success('支付成功')
          this.$toast.success('感谢你的购买')
          this.getCart(JSON.parse(localStorage.getItem('msg')).phoneNumber).then(res => {
            localStorage.setItem('cart', JSON.stringify(res.data.data))
          })
          // localStorage.setItem('cart', JSON.stringify([]))
        }).catch(() => {
          this.$toast.fail('购买失败')
        })
      }
    },
    select () {
      if (this.selectAll) {
        this.cartList = this.cart
        this.getSelectCart(this.cartList)
        localStorage.setItem('selectCart', JSON.stringify(this.cartList.map(item => item.productId)))
      } else {
        this.getSelectCart([])
        localStorage.setItem('selectCart', JSON.stringify([]))
      }
    }
  },
  created () {
    this.getCart(JSON.parse(localStorage.getItem('msg')).phoneNumber)
    this.checked = JSON.parse(localStorage.getItem('selectCart')) || []
    this.checkedList = JSON.parse(localStorage.getItem('selectList')) || []
    this.safeTotalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0.00
    Bus.$on('updateCart', (val) => {
      this.checked = val.map(item => item.productId)
      localStorage.setItem('selectCart', JSON.stringify(this.checked))
    })
  },
  data () {
    return {
      needPayMoney: null,
      lastMoney: null,
      currentMoney: null,
      toDeleteCartList: [],
      cartList: [],
      checked: [],
      checkedList: [],
      loading: true
    }
  },
  watch: {
    totalPrice (val) {
      localStorage.setItem('totalPrice', val)
    }
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
.app {
  padding: 10px;

  .van-nav-bar {
    .van-ellipsis {
      margin-left: 10px;
    }
  }

  .van-skeleton {
    margin-top: 10px;

    .van-skeleton__title {
      height: 20px;
    }
  }
}
</style>
