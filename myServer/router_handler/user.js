// 导入数据库操作模块
const db = require('../db/index')
//导入全局的token配置文件
const config = require('../config')
//导入密码加密中间件
const bcrypt = require('bcryptjs')
// 导入jwt包
const jwt = require('jsonwebtoken')
//导入axios
const axios = require('axios')

//注册处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    // 没有提交用户名或密码，或者用户名或密码有空值
    if (!userinfo.username || !userinfo.password || !userinfo.phoneNum) {
        return res.send({ status: 1, message: '输入不能为空' })
    }
    //定义sql语句，查询用户名是否被占用
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        //判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
            return res.cc('用户名被占用，请更换其他用户名')
        }
        // 调用 bcrypt 加密密码
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //    定义插入新用户的sql语句
        const sql = 'insert into users set ?'
        // 执行sql语句
        db.query(sql, { username: userinfo.username, phoneNum: userinfo.phoneNum, password: userinfo.password }, (err, results) => {
            // 判断sql语句是否接收成功
            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            }
            //判断影响行数是否为1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }
            //注册用户成功
            // res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功', 0)
        })
    })
}

//登录处理函数
exports.login = (req, res) => {
    //接受表单的数据
    const userinfo = req.body
    const sql = `select * from users where username=?`
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('用户名错误')
        if (results.length === 0) return res.cc('登录失败')
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (compareResult) {
            //登录成功，剔除密码
            const user = { ...results[0], password: '' }
            //加密用户信息，生成token字符串
            const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
            //将token响应给客户端
            res.send({
                status: 0,
                message: '登录成功',
                token: 'Bearer ' + tokenStr
            })
        } else {
            res.cc('密码错误')
        }
    })
}

// 发送验证码
exports.getCode = async (req, res) => {
    //生成随机验证码
    const code = Math.floor(Math.random() * (999999 - 100000)) + 100000
    const result = await axios({
        url: "http://106.ihuyi.com/webservice/sms.php",
        method: "POST",
        params: {
            method: "Submit",
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            account: "C30881971",
            password: "1097805f3773a69e9862842e4cd6e86e",
            format: "json",
            mobile: req.body.phoneNum,
            content:
                `感谢您使用云音乐App！您的验证码是：${code}。请不要把验证码泄露给任何人！`,
        },
    });
    result.data.verificationCode = code
    console.log(result.data);
    res.send(result.data)
}

// 获取用户信息
exports.getInfo = (req, res) => {
    res.send(req.auth)
}

//修改用户名
exports.updateUsername = (req, res) => {
    const username = req.auth.username
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, [username], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 0) {
            return res.cc('修改失败，请稍后再试')
        } else if (results.length === 1) {
            //在数据库中找到了用户，检查新用户名是否可用
            const str = 'select * from users where username=?'
            db.query(sqlStr, [req.body.newUsername], (err, results) => {
                if (err) {
                    // return res.send({ status: 1, message: err.message })
                    return res.cc(err)
                }
                //判断新用户名是否被占用
                if (results.length > 0) {
                    // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名' })
                    return res.cc('用户名被占用，请更换其他用户名')
                }
                //用户名可用，允许修改
                const updateStr = 'update users set username=? where username=?'
                db.query(updateStr, [req.body.newUsername, username], (err, results) => {
                    // 执行 SQL 语句失败
                    if (err) return res.cc(err)

                    // 执行 SQL 语句成功，但是影响行数不等于 1
                    if (results.affectedRows !== 1) return res.cc('修改用户名失败！')

                    // 更新用户头像成功
                    //修改用户名成功之后必须返回一个新的token，否则在获取用户信息时前端传入的还是老token，解析不到新的用户名
                    // return res.cc('修改用户名成功！', 0)
                    //查出用户的信息，形成新的token
                    const newInfo = 'select * from users where username=?'
                    db.query(newInfo, [req.body.newUsername], (err, results) => {
                        // 1. 执行 SQL 语句失败
                        if (err) return res.cc(err)

                        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
                        if (results.length !== 1) return res.cc('系统错误，请稍后再试')

                        //获取用户信息成功，生成新token
                        const user = { ...results[0], password: '' }
                        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
                        res.send({
                            status: 0,
                            message: '修改成功！',
                            data: { token: 'Bearer ' + tokenStr }
                        })
                    })
                })
            })
        }
    })
}

//修改密码
exports.updatePassword = (req, res) => {
    //先判断前端送过来的旧密码是否正确 旧密码：oldPassword 新密码：newPassword 确认密码：confirmPassword
    const userinfo = req.body
    const sql = `select * from users where username=?`
    db.query(sql, [req.auth.username], (err, results) => {
        if (err) return res.cc(err)
        //找不到用户
        if (results.length === 0) return res.cc('身份验证错误')
        // 能找到用户，校验旧密码
        const compareResult = bcrypt.compareSync(userinfo.oldPassword, results[0].password)
        if (compareResult) {
            //校验成功，设置新密码
            // 调用 bcrypt 加密密码
            let password = bcrypt.hashSync(req.body.newPassword, 10)
            const sqlStr = 'update users set password=? where username=?'
            db.query(sqlStr, [password, req.auth.username], (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.cc(err)

                // 执行 SQL 语句成功，但是影响行数不等于 1
                if (results.affectedRows !== 1) return res.cc('修改密码失败！')

                // 修改成功

                return res.send({
                    status: 0,
                    message: '修改密码成功！'
                })
            })
        } else {
            return res.cc('旧密码错误')
        }
    })
}