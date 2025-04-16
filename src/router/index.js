import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'
import Home from '@/views/home'
import FirstBar from '@/views/firstBar'
import Female from '@/views/female'
import Male from '@/views/male'
import My from '@/views/my'
import Bag from '@/views/bag'
import Login from '@/views/login'
import Cart from '@/views/cart'
import SingleShop from '@/views/singleshop'
import Register from '@/views/register'
import Search from '@/views/search'
import SearchContent from '@/views/searchcontent'
import SearchRecommond from '@/views/searchrecommond'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FirstBar,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/female', component: Female },
      { path: '/male', component: Male },
      { path: '/my', component: My },
      { path: '/bag', component: Bag },
      { path: '/cart', component: Cart }
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/singleshop', component: SingleShop },
  {
    path: '/search',
    component: Search,
    redirect: '/searchrecommond',
    children: [
      { path: '/searchcontent', component: SearchContent },
      { path: '/searchrecommond', component: SearchRecommond }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const phoneNumber = JSON.parse(localStorage.getItem('msg')).phoneNumber
  if (to.path === '/cart' && !phoneNumber) {
    Toast.fail('请先登录')
    next('/login')
  } else if (to.path === '/singleshop' && !phoneNumber) {
    Toast.fail('请先登录')
    next('login')
  } else {
    next()
  }
})

export default router
