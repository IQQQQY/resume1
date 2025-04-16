<template>
  <div class="app">
    <van-tabs v-model="active">
      <van-tab title="猜你喜欢">
        <template #title><van-icon name="smile-o" />猜你喜欢</template>
        <div class="content">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <Produce v-for="item in listArray" :key="item.id" :name="item.name" :price="item.price" :img="item.image"
            :original_price="item.original_price" :status_desc="item.status_desc" :gifts="item.gifts"
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
      <van-tab title="热门推荐">
        <template #title><van-icon name="fire-o" />热门推荐</template>
        <div class="content">
          <van-list v-model="loading" :finished="finished" @load="onLoad">
            <Produce v-for="item in hot" :key="item.id" :name="item.name" :price="item.price" :img="item.image"
            :original_price="item.original_price" :status_desc="item.status_desc" :gifts="item.gifts"
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
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      guess: [],
      hot: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      listArray: []
    }
  },
  computed: {
    ...mapState('all', ['all'])
  },
  created () {
    this.getAll({ offset: this.page, size: this.size })
    this.guess = this.all.filter(item => item.status_desc === '在售中')
  },
  watch: {
    active (val) {
      if (val === 0) {
        this.guess = this.listArray.filter(item => item.status_desc === '在售中')
      } else {
        this.hot = this.listArray.filter(item => item.status_desc === '热卖中')
      }
    }
  },
  methods: {
    ...mapActions('all', ['getAll']),
    async onLoad () {
      try {
        this.loading = true
        // 确保 listArray 已初始化
        if (!this.listArray) {
          this.listArray = []
        }
        const resData = await this.getAll({
          size: this.pageSize,
          offset: this.page
        })
        this.totalItems = resData.data.data.total
        this.listArray.push(...resData.data.data.data)
        this.page += 1
        if (this.listArray.length >= this.totalItems) {
          this.finished = true
        }
      } catch (error) {
        console.error('Error in onLoad:', error)
        this.finished = true
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style></style>
