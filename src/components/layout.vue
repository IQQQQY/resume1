<template>
  <div class="app">
    <van-row>
      <van-col v-for="item in images" :key="item.src" :span="item.span" @click="click(item.router)" >
        <router-link :to="item.router">
          <van-image width="98%" height="98%" fit="cover"
          :src="item.src" />
          <span>{{ item.content }}</span>
        </router-link>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Layout',
  data () {
    return {
      images: [
        { src: 'http://localhost:3000/uploads/home-content1.png', span: 12, content: '男装', router: '/male' },
        { src: 'http://localhost:3000/uploads/home-content2.png', span: 6, content: '推荐', router: '/' },
        { src: 'http://localhost:3000/uploads/home-content3.png', span: 6, content: '首页', router: '/home' },
        { src: 'http://localhost:3000/uploads/home-content4.png', span: 6, content: '特价', router: '/' },
        { src: 'http://localhost:3000/uploads/home-content5.png', span: 6, content: '箱包', router: '/bag' },
        { src: 'http://localhost:3000/uploads/home-content6.png', span: 12, content: '女装', router: '/female' }
      ]
    }
  },
  // 点击推荐和特价页时滚动到侧边栏
  methods: {
    click (router) {
      if (router === '/') {
        $('body,html').animate({ scrollTop: 410 }, 500)
      }
    }
  }
}
</script>

<style lang="less" scoped>
body,html {
  transition: all 1s;
  .app {
  margin-top: 18px;

  .van-row {
    display: flex;
    height: 40vw;
    flex-wrap: wrap;

    .van-col {
      height: 20vw;
      margin-top: 2px;
      position: relative;
      .van-image {
        position: absolute;
        top: 0;
        left: 0;
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ffffff;
      }
    }
  }
}
}
</style>
