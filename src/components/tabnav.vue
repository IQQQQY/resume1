<template>
  <div class="app">
    <van-tabs v-model="active" @click="changeContent()">
      <van-tab title="全部">
        <div class="content">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <Produce
          v-for="item in listArray"
          :key="item.id"
          :name="item.name"
          :price="item.price"
          :img="item.image"
          :original_price="item.original_price"
          :status_desc="item.status_desc"
          :gifts="item.gifts"
          :other="item.other"
          :sell="item.sell"
          :count="item.count"
          :color="item.color"
          :sizes="item.sizes"
          :id="item.id"
          ></Produce>
            </van-list>
        </div>
      </van-tab>
      <van-tab title="销量">
        <div class="content">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <Produce
          v-for="item in sellArray"
          :key="item.id"
          :name="item.name"
          :price="item.price"
          :img="item.image"
          :original_price="item.original_price"
          :status_desc="item.status_desc"
          :gifts="item.gifts"
          :other="item.other"
          :sell="item.sell"
          :count="item.count"
          :color="item.color"
          :sizes="item.sizes"
          :id="item.id"
          ></Produce>
        </van-list>
        </div>
      </van-tab>
      <van-tab title="最新">
        <div class="content">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <Produce
          v-for="item in newArray"
          :key="item.id"
          :name="item.name"
          :price="item.price"
          :img="item.image"
          :original_price="item.original_price"
          :status_desc="item.status_desc"
          :gifts="item.gifts"
          :other="item.other"
          :sell="item.sell"
          :count="item.count"
          :color="item.color"
          :sizes="item.sizes"
          :id="item.id"
          ></Produce>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="特价">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <div class="content">
          <Produce
          v-for="item in priceArray"
          :key="item.id"
          :name="item.name"
          :price="item.price"
          :img="item.image"
          :original_price="item.original_price"
          :status_desc="item.status_desc"
          :gifts="item.gifts"
          :other="item.other"
          :sell="item.sell"
          :count="item.count"
          :color="item.color"
          :sizes="item.sizes"
          :id="item.id"
          ></Produce>
        </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'TabNav',
  data () {
    return {
      active: 0,
      listArray: [],
      size: 4,
      loading: false,
      finished: false,
      totalItems: 0,
      page: 1,
      sellArray: [],
      newArray: [],
      priceArray: []
    }
  },
  props: {
    Fn: Function
  },
  created () {
    this.Fn({ size: this.size, offset: this.page })
  },
  methods: {
    changeContent () {
      switch (this.active) {
        case 1:
          this.sellArray = this.listArray.filter(item => item.sell > 100)
          break
        case 2:
          this.newArray = this.listArray.filter(item => item.status_desc === '预售中')
          break
        case 3:
          this.priceArray = this.listArray.filter(item => item.price < 300)
          break
        default:
          break
      }
    },
    async onLoad () {
      try {
        this.loading = true
        if (!this.listArray) {
          this.listArray = []
        }
        const resData = await this.Fn({ size: this.size, offset: this.page })
        this.totalItems = resData.data.data.total
        this.listArray.push(...resData.data.data.data)
        this.page += 1
        if (this.listArray.length >= this.totalItems) {
          this.finished = true
          return
        }
      } catch (err) {
        console.log(err)
        this.finished = true
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
  }
}
</script>

<style lang="less">
.app {
  h3 {
    font-size: 30px;
    text-align: center;
    margin-block-end: 10px;
    margin-block-start: 10px;
  }

  .van-tabs {
    .van-tab--active {
      .van-tab__text--ellipsis {
        color: red;
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      .van-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
