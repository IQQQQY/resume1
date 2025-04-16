<template>
  <div class="app">
    <HeadBar></HeadBar>
    <h3>箱包</h3>
    <TabNav :Fn="getBag"></TabNav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'NavBag',
  created () {
    this.getBag()
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapState('bag', ['bag'])
  },
  methods: {
    ...mapActions('bag', ['getBag'])
  }
}
</script>

<style scoped lang="less">
.app {
  h3 {
    font-size: 30px;
    text-align: center;
    margin-top: 10px 0;
    padding-top: 50px;
  }
}
</style>
