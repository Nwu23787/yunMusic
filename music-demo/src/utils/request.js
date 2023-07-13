//网络请求的方法
import axios from "axios";
const ajax = axios.create({
    baseURL: 'http://localhost:3000'
})

export default ajax//导出一个axios函数