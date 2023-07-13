//网络请求的方法
import axios from "axios";
const ajax = axios.create({
    baseURL: 'http://127.0.0.1:3008'
})

export default ajax//导出一个axios函数