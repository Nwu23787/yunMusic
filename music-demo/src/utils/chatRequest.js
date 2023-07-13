//网络请求的方法
import axios from "axios";
const ajax = axios.create({
    baseURL: 'https://api.openai-proxy.org'
})

export default ajax//导出一个axios函数