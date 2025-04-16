<template>
  <div class="app">
    <div v-if="loading">
      <van-skeleton title title-width="30%" style="height:50px"></van-skeleton>
      <van-skeleton :row="list.length" style="width: 80%;"></van-skeleton>
    </div>
    <div v-else>
      <van-cell value="猜你想搜" />
    <div class="search-content">
      <router-link :to="{ path: '/singleshop', query: {
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
          id: item.id
          }}"  v-for="item in list" :key="item.id" >
        <van-cell :title="item.name" class="search-item">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #icon>
          <van-icon name="search" class="search-icon" />
        </template>
      </van-cell>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus'
export default {
  name: 'SearchContent',
  created () {
    Bus.$on('search', (val) => {
      this.list = val
    })
    this.list = JSON.parse(localStorage.getItem('search')) ? JSON.parse(localStorage.getItem('search')).list : []
  },
  data () {
    return {
      list: [],
      loading: true
    }
  },
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-cell {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .search-item {
    height: 45px;
    display: flex;
    align-items: center;
    .search-icon {
      font-size: 20px;
      margin-right: 5px;
      color: #b8b8b8;
    }
  }
}
</style>
