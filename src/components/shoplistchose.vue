<template>
  <!--
    商品规格选择组件
    功能：
    - 选择商品规格
    - 点击加入购物车，将对应商品信息添加到购物车
    - TODO：当加入相同规格商品到购物车，数量累加
  -->
  <div class="app">
    <van-sku :value="show" :sku="sku" :goods="goods" @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked"
      @close="makeHide" @stepper-change="num" reset-selected-sku-on-hide reset-stepper-on-hide @changeCart="changeCart"/>
  </div>
</template>
<script>
/**
 * 商品规格选择组件
 * @displayName shoplistchose
 * @data {Object} sku - 商品规格信息
 * @data {Object} goods - 商品信息
 * @data {Array} listArray - 商品规格列表
 * @data {Number} purchaseNum - 购买数量
 * @data {Array} other - 其他信息
 * @methods {Function} onBuyClicked - 购买按钮点击事件
 * @methods {Function} onAddCartClicked - 加入购物车按钮点击事件
 * @methods {Function} hiden - 隐藏组件事件
 * @methods {Function} num - 购买数量变化事件
 * @methods {Function} setList - 设置商品规格列表
 * @methods {Function} setSku - 设置商品规格信息
 * @computed {Boolean} show - 显示组件参数
 * @computed {Object} cart - 购物车信息
 * @created {Function} created - eventBus监听
 * @created {Function} setList - 设置商品规格列表
 * @created {Function} setSku - 设置商品规格信息
 * @beforeDestroy {Function} beforeDestroy - eventBus监听销毁
 */
import Bus from '@/utils/eventBus'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      // 商品规格框架
      sku: {
        // 商品所有规格
        tree: [
          {
            k: '颜色',
            k_s: 's1',
            v: [],
            largeImageMode: false
          },
          {
            k_s: 's2',
            k: '尺寸',
            v: []
          }
        ],
        // 商品价格
        price: null,
        // 商品库存
        stock_num: null,
        // 留言信息
        messages: [
          {
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no(身份证), text, tel, date, time, email
            required: '1', // 是否必填 '1' 表示必填
            placeholder: '', // 可选值，占位文本
            extraDesc: '' // 可选值，附加描述文案
          }
        ],
        /**
         *商品规格列表
         *@argument {String} phoneNumber - 手机号
         *@argument {String} productId - 商品id
         *@argument {String} color - 颜色
         *@argument {String} size - 尺寸
         *@argument {Number} price - 价格
         *@argument {Number} quantity - 数量
         *@argument {String} name - 商品名称
         *@argument {String} img - 商品图片
         *@argument {Object} other - 其他权益
         */
        list: []
      },
      goods: {
        picture: ''
      },
      listArray: [],
      purchaseNum: 1,
      other: [],
      needPayMoney: 0,
      currentMoney: 0,
      lastMoney: 0
    }
  },
  methods: {
    /**
     * 购买按钮点击事件
     * TODO：点击购买按钮，扣除余额或积分，将商品添加到待发货订单
     *
     * 加入购物车按钮点击事件
     * @param data {Object} 商品规格信息
     * @param data.selectedSkuComb {Object} 商品规格组合
     * @param data.selectedSkuComb.id {String} 商品id
     * @param data.selectedSkuComb.s1 {Number} 颜色索引
     * @param data.selectedSkuComb.s2 {Number} 尺寸索引
     * @param data.selectedSkuComb.price {Number} 商品价格
     * @param data.selectedSkuComb.stock_num {Number} 商品库存
     * @param data.selectedSkuComb.name {String} 商品名称
     * @param data.selectedSkuComb.imgUrl {String} 商品图片
     * @param data.selectedSkuComb.other {Object} 其他权益
     */
    onAddCartClicked (data) {
      const list = data.selectedSkuComb
      const color = list.s1
      const size = list.s2
      const obj = {
        phoneNumber: JSON.parse(localStorage.getItem('msg')).phoneNumber,
        productId: list.id,
        color: JSON.parse(this.listArray.color)[color],
        size: JSON.parse(this.listArray.sizes)[size].size,
        price: list.price / 100,
        name: list.name,
        img: list.imgUrl,
        quantity: this.purchaseNum,
        other: list.other
      }
      this.addCart(obj)
      this.getCart(JSON.parse(localStorage.getItem('msg')).phoneNumber)
      this.getCart(JSON.parse(localStorage.getItem('msg')).phoneNumber).then(res => {
        console.log(res)
        res.data.data.forEach(item => {
          if (item.productId.startsWith('undefined')) {
            item.productId.replace(/'undefined'/g, +new Date())
            console.log(item.productId)
          }
        })
        localStorage.setItem('cart', JSON.stringify(res.data.data))
      })
      this.makeHide()
      this.$router.push('/cart')
    },
    hiden () {
      this.makeHide()
    },
    /**
     * 步进器变化事件
     * @description 购买数量与步进器同步变化
     * @param data {Number} 购买数量
     */
    num (data) {
      console.log(data)
      this.purchaseNum = data
    },
    ...mapMutations('cart', ['makeShow', 'makeHide']),
    ...mapActions('cart', ['addCart', 'getCart']),
    setList (val) {
      this.sku.list = []
      const colors = JSON.parse(val.color)
      const sizes = JSON.parse(val.sizes)
      const other = JSON.parse(val.other)
      colors.forEach((item, index) => {
        sizes.forEach((item, index2) => {
          const obj = {
            id: val.id + `${index}${index2}`,
            s1: index,
            s2: index2,
            price: val.price * 100 + index2 * 1000,
            stock_num: parseInt(val.count / (colors.length * sizes.length)),
            name: val.name,
            imgUrl: val.img,
            other: other
          }
          this.sku.list.push(obj)
        })
      })
    },
    setSku (val) {
      this.sku.tree[0].v = []
      this.sku.tree[1].v = []
      if (!val) {
        return new Error('val is not defined')
      }
      this.sku.id = val.id
      this.sku.other = val.other
      this.goods.picture = val.img
      this.sku.price = val.price
      this.sku.stock_num = Number(val.count)
      JSON.parse(val.color).forEach((item, index) => {
        const obj = {
          id: index,
          name: item,
          imgUrl: val.img
        }
        this.sku.tree[0].v.push(obj)
      })
      JSON.parse(val.sizes).forEach((item, index) => {
        const obj = {
          id: index,
          name: item.size,
          price: item.size === '均码' || item.size === 'S' ? 0 : 20
        }
        this.sku.tree[1].v.push(obj)
      })
    },
    onBuyClicked () {
      this.needPayMoney = this.sku.price * this.purchaseNum * 100
      this.currentMoney = JSON.parse(localStorage.getItem('msg')).totalAssets
      this.lastMoney = this.currentMoney - this.needPayMoney
      if (this.currentMoney < this.needPayMoney) {
        this.$toast.fail('余额不足')
      } else {
        localStorage.setItem('msg', JSON.stringify({
          totalAssets: this.lastMoney,
          phoneNumber: JSON.parse(localStorage.getItem('msg')).phoneNumber,
          userName: JSON.parse(localStorage.getItem('msg')).userName
        }))
        this.$toast.success('支付成功')
        this.makeHide()
      }
    },
    changeCart (data) {
      this.checked = data.filter(item => item.productId)
      localStorage.setItem('selectCart', JSON.stringify(this.checked))
    }
  },
  computed: {
    ...mapState('cart', ['show', 'cart'])
  },
  created () {
    this.makeHide()
    if (Bus) {
      Bus.$on('set', (val) => {
        this.listArray = val
        this.setSku(val)
        this.setList(val)
      })
    } else {
      console.log('Bus is not defined')
    }
  },
  beforeDestroy () {
    if (Bus) {
      Bus.$off('set')
    }
  }
}
</script>

<style></style>
