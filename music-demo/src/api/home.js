import request from '@/utils/request'

//定义一个发起请求获取推荐歌单的方法
export const recommendMusic = params => request({
    url: '/personalized',
    params
})

export const newMusic = params => request({
    url: '/personalized/newsong',
    params
})