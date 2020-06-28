import request from '@/utils/request'
//注册
export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

//登录
export function login(data) {
  console.log(data)
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
//获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

