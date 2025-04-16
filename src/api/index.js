import axios from 'axios'
// 获取女装信息
export async function getFemale (data) {
  return await axios.get(`http://localhost:3000/api/data/female?size=${data.size}&offset=${data.offset}`)
}
// 获取男装信息
export async function getMale (data) {
  return await axios.get(`http://localhost:3000/api/data/male?size=${data.size}&offset=${data.offset}`)
}
// 获取箱包信息
export async function getBag (data) {
  return await axios.get(`http://localhost:3000/api/data/bag?size=${data.size}&offset=${data.offset}`)
}
// 请求全部信息
export async function getAll (data) {
  return await axios.get(`http://localhost:3000/api/data/all?size=${data.size}&offset=${data.offset}`)
}
// 请求购物车数据
export async function getCart (params) {
  return await axios.get(`http://localhost:3000/api/cart?phoneNumber=${params}`)
}
// 添加购物车数据
export async function addCart (data) {
  return await axios.post('http://localhost:3000/api/cart/add', data)
}
// 删除购物车信息
export async function deleteCart (data) {
  return await axios.post('http://localhost:3000/api/cart/delete', data)
}
// 用户登录
export async function login (data) {
  return await axios.post('http://localhost:3000/api/login', data)
}
// 用户注册
export async function register (data) {
  return await axios.post('http://localhost:3000/api/register', data)
}
// 获取用户信息
export async function getUserInfo () {
  return await axios.get('http://localhost:3000/api/user')
}
// 修改用户信息
export async function updateUserInfo (data) {
  return await axios.post('http://localhost:3000/api/user/update', data)
}
// 发送验证码
export async function verCode (data) {
  return await axios.post('http://localhost:3000/api/verCode', data)
}
