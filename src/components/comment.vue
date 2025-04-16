<template>
  <div class="app">
    <van-cell title="买家评价" icon="shop-o">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="search" class="search-icon" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.app {
  z-index: 1;
  margin-bottom: 100px;
  .van-cell {
    height: 40px;
  }
}
</style>
