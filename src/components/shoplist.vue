<template>
  <div class="app">
    <Slider :images="[$route.query.img]"></Slider>
    <van-cell-group>
      <van-cell :title="'' + $route.query.price" :value="`已售出${$route.query.sell}件`"
        :label="`库存${$route.query.count}件`">
        <template #title>
          <span class="price">￥{{ $route.query.price }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-grid direction="horizontal" :column-num="3">
      <a href="javascript:;">
        <van-grid-item icon="photo-o" v-for="item in color" :key="item">
          <img :src="$route.query.img" alt="">
        </van-grid-item>
      </a>
      <van-grid-item icon="photo-o" text="文字">
        {{ color.length }}款可选
      </van-grid-item>
    </van-grid>
    <van-cell-group v-for="item in list" :key="item.gift_id">
      <van-cell :title="$route.query.name" :label="'赠品：' + item.gift_name" v-if="item.gift_id" />
    </van-cell-group>
    <van-cell :title="$route.query.name" :label="'赠品：无'" v-if="!list.length" />
    <van-cell-group>
      <van-cell label="当天下单当天发货，晚到包赔">
        <template #title>
          <span v-for="item in serve" :key="item" class="serve">{{ item }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <ShopListBottom :set="set"></ShopListBottom>
  </div>
</template>

<script>
import $ from 'jquery'
import Bus from '@/utils/eventBus'
export default {
  mounted () {
    $('body,html').scrollTop(0)
  },
  created () {
    this.list = typeof this.$route.query.gifts === 'object' ? this.$route.query.gifts : JSON.parse(this.$route.query.gifts)
    this.serve = typeof this.$route.query.other === 'object' ? this.$route.query.other : JSON.parse(this.$route.query.other)
    this.color = typeof this.$route.query.color === 'object' ? this.$route.query.color : JSON.parse(this.$route.query.color)
    this.sizes = typeof this.$route.query.sizes === 'object' ? this.$route.query.sizes : JSON.parse(this.$route.query.sizes)
  },
  data () {
    return {
      list: [],
      serve: [],
      colors: [],
      sizes: []
    }
  },
  methods: {
    set () {
      if (this.$route.query) {
        Bus.$emit('set', this.$route.query)
      } else {
        Bus.$emit('set', {})
        throw new Error('set query is empty')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-swipe {
    height: 100px;
  }

  .van-cell {
    height: 17vw;
    line-height: 20px;

    .van-cell__title {
      span {
        font-size: 17px;
      }

      .price {
        color: red;
        font-size: 25px;
      }

      .van-cell__label {
        &:nth-child(3) {
          color: rgb(116, 83, 61);
        }
      }

      .serve {
        margin-right: 10px;
        color: orange;
        font-size: 12px;
        border: 1px solid orange;
      }
    }

    .van-cell__value {
      font-size: 16px;
      color: green;
      font-weight: 600;
    }
  }

  .van-goods-action {
    z-index: 100;
  }

  .van-grid {
    padding: 5px 10px;

    a {
      display: flex;
      .van-grid-item {
        display: flex;
        width: 100%;

        img {
          height: 70px;
          width: auto;
        }
      }
    }

  }
}
</style>
