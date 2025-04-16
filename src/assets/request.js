import axios from 'axios'
import { Toast } from 'vant'

let loadingCount = 0 // 当前正在进行的请求数量
let loadingInstance = null

// 请求拦截器
axios.interceptors.request.use(config => {
  // 检查请求是否为图片请求
  if (!config.url.includes('/images/')) {
    if (loadingCount === 0) {
      loadingInstance = Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }
    loadingCount++
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(
  response => {
    loadingCount--
    if (loadingCount <= 0) {
      loadingInstance?.clear()
    }
    return response
  },
  error => {
    loadingCount--
    if (loadingCount <= 0) {
      loadingInstance?.clear()
    }
    Toast.fail(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default axios
