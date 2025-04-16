<template>
  <div class="app">
    <van-nav-bar left-arrow @click-left="goBack">
      <template #title>
        <van-search placeholder="搜索" @input="goSearch" v-model="search" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import Bus from '../utils/eventBus'
import { fd } from '../utils/index'
import { mapState, mapActions } from 'vuex'
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
      localStorage.removeItem('search')
    },
    handleSearch () {
      Bus.$on('history', () => {
        this.history = []
      })
      if (this.$route.path === '/searchrecommond') {
        this.$router.push('/searchcontent')
      }
      this.searchList = this.all.filter(item => item.name.includes(this.search))
      Bus.$emit('search', this.searchList)
      localStorage.setItem('search', JSON.stringify({ search: this.search, list: this.searchList }))
      if (!this.history.includes(this.search) && this.search.trim() !== '') {
        this.history.push(this.search)
        localStorage.setItem('history', JSON.stringify(this.history))
      }
    },
    goSearch: fd(function () {
      this.handleSearch()
    }, 1000),
    ...mapActions('all', ['getAll'])
  },
  computed: {
    ...mapState('all', ['all'])
  },
  created () {
    this.getAll()
    this.search = JSON.parse(localStorage.getItem('search')) ? JSON.parse(localStorage.getItem('search')).search : ''
    Bus.$on('record', (record) => {
      this.search = record
      this.handleSearch()
    })
  },
  data () {
    return {
      searchList: [],
      search: '',
      timer: null,
      history: []
    }
  },
  beforeDestroy () {
    Bus.$off('history')
    Bus.$off('search')
  },
  watch: {
    $route (to) {
      if (to.path === '/searchrecommond') {
        this.search = ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.app {
  margin-top: 10px;

  .van-nav-bar {
    .van-nav-bar__right {
      padding-left: 0px;
    }

    .van-search {
      width: 80vw;
      padding-left: 0px;
    }
  }
}
</style>
