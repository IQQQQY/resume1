<template>
  <div class="app">
    <router-link
      :to="{ path: '/singleshop', query: { id, name, price, original_price, img, status_desc, gifts: JSON.stringify(gifts), other: JSON.stringify(other), count, sell, color: JSON.stringify(color), sizes: JSON.stringify(sizes) } }">
      <van-row>
        <van-col span="25">
          <van-card :price="price" :title="name" :origin-price="original_price" :thumb="img" lazy-load>
            <template #tags>
              <span class="gift" v-show="gifts.length" v-for="item in gifts" :key="item.gift_id">赠品：{{ item.gift_name }}
              </span>
              <span class="other" v-for="item in other" :key="item">{{ item }}</span>
            </template>
            <template #tag>
              <span class="van-tag van-tag--mark"
                :class="{ 'van-tag--primary': status_desc === '预售中', 'van-tag--danger': status_desc === '热卖中', 'van-tag--default': status_desc === '已售罄', 'van-tag--success': status_desc === '在售中' }">{{
                status_desc }}</span>
            </template>
          </van-card>
        </van-col>
        <van-col span="24">
        </van-col>
      </van-row>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    price: Number,
    original_price: Number,
    img: String,
    status_desc: String,
    gifts: Array,
    other: Array,
    count: Number,
    sell: Number,
    color: Array,
    sizes: Array,
    id: String
  },
  computed: {

  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.app {
  margin-top: 0px;
  width: 50%;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;

  .van-card {
    background-color: #fff;
    padding: 10px;
    height: 63vw;
    width: 100%;

    .van-card__header {
      flex-direction: column;
      align-items: center;
      height: 100px;

      .van-card__thumb {
        margin-right: 0px;
        height: 150px;
        width: 150px;
      }

      .van-card__content {
        min-height: 15vw;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 5px;
        width: 80%;

        .van-card__price-integer,
        .van-card__price-currency {
          color: red;
        }

        .gift {
          color: red;
          font-size: 9px;
          border: 1px solid red;
          margin-left: 5px;
        }

        .other {
          color: orange;
          font-size: 9px;
          border: 1px solid orange;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
