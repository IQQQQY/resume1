<template>
  <div class="app">
    <van-row>
      <van-col span="3">
        <van-checkbox-group :value="checked" ref="checkboxGroup">
          <van-checkbox :name="id" @click="handleChange(id)"></van-checkbox>
        </van-checkbox-group>
      </van-col>
      <van-col span="21">
        <van-icon name="cross" @click="deleteItem({ size, id })"></van-icon>
        <van-card :price="price" :title="name" :thumb="img">
          <template #desc>
            <div>
              <span v-for="item in other" :key="item" class="other">{{ item }}</span>
            </div>
          </template><br>
          <template #tags>
            <div>
              <van-tag plain type="primary" class="sku">{{ color }} </van-tag>
              <van-tag plain type="primary" class="sku">{{ size }} </van-tag>
            </div>
          </template>
          <template #footer>
            <van-stepper integer v-model="num" @plus="sub(id)" @minus="sub(id)" @blur="set(id)" />
          </template>
        </van-card>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import Bus from '@/utils/eventBus'
import { mapMutations, mapActions } from 'vuex'
export default {
  created () {
    this.num = this.quantity
  },
  props: {
    name: String,
    img: String,
    price: Number,
    quantity: Number,
    color: String,
    size: String,
    other: Array,
    id: String,
    checked: Array
  },
  data () {
    return {
      num: 0,
      others: [],
      result: [true],
      timer: null
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations('cart', ['changeQuantity', 'getSelectCart']),
    ...mapActions('cart', ['deleteCart', 'getCart']),
    add (data) {
      this.changeQuantity({
        id: data,
        quantity: -1,
        flag: 'add'
      })
    },
    sub (data) {
      this.changeQuantity({
        id: data,
        quantity: -1,
        flag: 'sub'
      })
    },
    set (data) {
      this.changeQuantity({
        id: data,
        quantity: this.num,
        flag: 'set'
      })
    },
    deleteItem (data) {
      this.deleteCart({
        phoneNumber: JSON.parse(localStorage.getItem('msg')).phoneNumber,
        products: [{ productId: data.id, size: data.size }]
      }).then(async res => {
        this.$toast.success(res.data)
        await this.getCart(JSON.parse(localStorage.getItem('msg')).phoneNumber).then(res => {
          localStorage.setItem('cart', JSON.stringify(res.data.data))
          this.checkedList = JSON.parse(localStorage.getItem('cart'))
          localStorage.setItem('selectList', JSON.stringify(this.checkedList))
          console.log(JSON.parse(localStorage.getItem('selectList')))
          this.getSelectCart(JSON.parse(localStorage.getItem('selectList')))
          Bus.$emit('updateCart', this.checkedList)
        })
      }).catch(err => {
        this.$toast.fail(err)
      })
    },
    handleChange (id) {
      this.$emit('change', id)
    }
  }
}
</script>

<style scoped lang="less">
.app {
  .van-col {
    position: relative;

    .van-icon {
      font-size: 12px;
      display: block;
      position: absolute;
      top: 20px;
      right: 15px;
      z-index: 1000;
      color: #c9c9c9;
    }
  }

  .van-card {
    .van-card__content {
      padding: 5px;

      .van-card__title {
        font-size: 15px;
        font-weight: 600;
      }

      .other {
        color: orange;
        margin: 5px 5px 5px 0;
      }

      .sku {
        margin: 5px 5px 5px 0;
      }
    }

    .van-card__price {
      span {
        color: red;
        font-weight: 600;
      }
    }

    .van-card__footer {
      position: absolute;
      bottom: 15px;
      right: 0;
    }
  }
}
</style>
