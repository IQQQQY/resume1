<template>
  <div class="app">
    <van-cell title="历史记录">
      <template #right-icon>
        <van-icon name="delete-o" class="deleteItem" @click="clearHistory">
        </van-icon>
      </template>
    </van-cell>
    <div class="history-content">
      <span class="history-title" v-for="item in historyList" :key="item" @click="goSearch(item)">{{ item }}</span>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/eventBus'
export default {
  data () {
    return {
      historyList: []
    }
  },
  created () {
    this.historyList = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    clearHistory () {
      localStorage.setItem('history', JSON.stringify([]))
      this.historyList = []
      Bus.$emit('history', [])
    },
    goSearch (item) {
      this.$router.push('/searchcontent')
      Bus.$emit('record', item)
    }
  }
}
</script>

<style lang="less" scoped>
.app {
  .van-cell {
    .van-cell__title {
      font-size: 14px;
    }
  }

  .history-content {
    padding: 15px;
    max-height: 200px;
    overflow: hidden;

    .history-title {
      font-size: 14px;
      display: inline-block;
      text-align: center;
      height: 25px;
      padding: 0 5px;
      line-height: 25px;
      background-color: #f7f7f7;
      margin-left: 10px;
      border-radius: 5px;
    }
  }
}
</style>
