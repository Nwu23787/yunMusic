import request from '@/utils/userRequest'
import qs from 'qs'

//注册
export const userRegester = (data) => request({
    url: '/users/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
})

//登录
export const userLogin = (data) => request({
    url: '/users/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
})

//获取用户信息
export const getUserInfo = () => request({
    url: '/users/getInfo',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': localStorage.getItem('token')
    },
})

//修改用户名
export const updateUsername = (data) => request({
    url: 'users/update/username',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': localStorage.getItem('token')
    },
    data: qs.stringify(data)
})

//修改密码
export const updatePassword = (data) => request({
    url: 'users/update/password',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': localStorage.getItem('token')
    },
    data: qs.stringify(data)
})