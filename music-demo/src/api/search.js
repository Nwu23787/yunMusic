import request from '@/utils/request'

//发起请求获取热搜关键词
export const getHotSearch = () => request({
    url: '/search/hot'
})

export const getResults = params => request({
    url: '/cloudsearch',
    params
})