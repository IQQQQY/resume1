<template>
  <div class="app">
    <van-sidebar v-model="active" @change="changeContent">
      <van-sidebar-item title="全部商品" />
      <van-sidebar-item title="流行商品" />
      <van-sidebar-item title="预售商品" />
      <van-sidebar-item title="特价商品" />
    </van-sidebar>
    <div class="content">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <Produce v-for="item in active === 0 ? listArray : []" :key="item.id" :name="item.name" :price="item.price"
          :img="item.image" :original_price="item.original_price" :status_desc="item.status_desc" :gifts="item.gifts"
          :other="item.other" :id="item.id" :sell="item.sell" :count="item.count" :color="item.color"
          :sizes="item.sizes"></Produce>
      </van-list>
      div
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      listArray: [],
      page: 1,
      pageSize: 4,
      totalItems: 0
    }
  },
  computed: {
    ...mapState('all', ['all'])
  },
  methods: {
    ...mapActions('all', ['getAll']),
    changeContent () {
      switch (this.active) {
        case 0:
          this.listArray = this.list
          break
        case 1:
          this.listArray = this.list.filter(item => item.status_desc === '在售中')
          break
        case 2:
          this.listArray = this.list.filter(item => item.status_desc === '预售中')
          break
        case 3:
          this.listArray = this.list.filter(item => item.original_price !== null)
          break
        default:
          break
      }
    },
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

  },
  created () {
    this.getAll({ size: this.pageSize, offset: this.page })
  },
  props: {
    list: Array
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.app {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  overflow: hidden;

  .van-sidebar {
    width: 10%;

    .van-sidebar-item--select {
      background-color: red;
      color: white;
    }
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    width: 85%;
    .van-list {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
