const express = require('express')

const expressJWT = require('express-jwt');

//创建express服务器
const app = express()

// 在路由之前封装res.cc函数
app.use((req, res, next) => {
    //status默认值为1，表示失败的情况
    // err的值可能是一个错误对象，也可能是一个字符串
    res.cc = function (err, status = 1) {
        res.send({
            status: status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
//导入CORS中间件
const cors = require('cors')

//注册中间件
//cors中间件
app.use(cors())
// 导入配置文件
const config = require('./config')

// 解析 token 的中间件

//解析表单数据中间件
app.use(express.urlencoded({ extended: false }))

// app.use(expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({ path: [/^\/user\//] }))
app.use("/users/getInfo", expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }));
//修改用户信息路由
app.use("/users/update", expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }));
app.use("/history", expressJWT.expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }));



//导入注册登录验证路由
const register = require('./router/user')
app.use('/users', register)
//导入获取用户历史记录路由
const history = require('./router/history')
app.use('/history', history)

// 定义错误级别的中间件
// app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') return res.cc('身份认证错误')
//     res.cc('未知的错误')
// })


//启动服务器
app.listen(3008, () => {
    console.log('yun server is running at http://127.0.0.1:3008');
})