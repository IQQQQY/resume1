<template>
  <div class="app">
    <van-tabs v-model="active" @click="changeActive">
      <van-tab v-for="item in list" :key="item.id">
        <template #title>
          <van-icon :name="item.icon" />{{item.title}}
        </template>
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <router-link v-for="(item, index) in listArray" :key="item.id" :to="{
          path: '/singleshop', query: {
          name: item.name,
          price: item.price,
          img: item.image,
          original_price: item.original_price,
          status_desc: item.status_desc,
          gifts: JSON.stringify(item.gifts),
          other: JSON.stringify(item.other),
          sell: item.sell,
          count: item.count,
          color: JSON.stringify(item.color),
          sizes: JSON.stringify(item.sizes),
          id: item.id}}">
          <van-cell :title="item.name">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon class="van-cell__right-icon">
            热度{{ item.sell }}<van-icon name="fire-o" />
          </template>
          <template #icon>
            <span class="place">{{ index + 1 }}</span>
          </template>
        </van-cell>
        </router-link>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      list: [
        { id: 0, title: '今日热搜', icon: 'fire' },
        { id: 1, title: '穿搭推荐', icon: '' },
        { id: 2, title: '明星同款', icon: '' },
        { id: 3, title: '什么东西', icon: '' }
      ],
      currentList: [],
      active: 0,
      loading: false,
      finished: false,
      page: 1,
      size: 12,
      totalItems: 0,
      listArray: []
    }
  },
  computed: {
  },
  created () {
    this.currentList = JSON.parse(localStorage.getItem('searchRecommond')) || this.all.sort((a, b) => b.sell - a.sell).slice(0, 15)
    this.active = Number(localStorage.getItem('searchRActive')) || 0
    this.getAll({ offset: this.page, size: this.size })
  },
  methods: {
    ...mapActions('all', ['getAll']),
    randomArray (arr, count) {
      return [...arr].sort(() => Math.random() - 0.5).slice(0, count)
    },
    changeActive (val) {
      localStorage.setItem('searchRActive', val)
      switch (val) {
        case 1:
          this.listArray = this.randomArray(this.listArray)
          break
        case 2:
          this.listArray = this.listArray.filter(item => item.status_desc === '热卖中')
          break
        case 3:
          this.listArrayentList = this.randomArray(this.listArray)
          break
        default:
          this.listArray = this.listArray.sort((a, b) => b.sell - a.sell)
          break
      }
      localStorage.setItem('searchRecommond', JSON.stringify(this.currentList))
    },
    async onLoad () {
      try {
        this.loading = true
        const resData = await this.getAll({ offset: this.page, size: this.size })
        this.totalItems = resData.data.data.total
        this.listArray.push(...resData.data.data.data)
        this.page += 1
        if (this.listArray.length >= this.totalItems) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.finished = true
        return
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-tabs {
    .van-cell {
      padding: 20px;
      display: flex;
      align-items: center;
      height: 45px;

      .place {
        font-size: 18px;
        margin-right: 10px;
        color: rgb(255, 118, 118);
      }

      .van-cell__title {
        font-size: 15px;
        color: #888888;
      }

      .van-icon {
        color: red;
      }
    }
  }
}
</style>
