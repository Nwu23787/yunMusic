import request from '@/utils/userRequest'
import qs from 'qs'

//添加历史记录
export const addHistory = (data) => request({
    url: '/history/add',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': localStorage.getItem('token')
    },
    data: qs.stringify(data)
})

//获取历史记录
export const getHistory = () => request({
    url: '/history/get',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': localStorage.getItem('token')
    },
})
