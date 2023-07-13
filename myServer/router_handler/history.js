// 导入数据库操作模块
const db = require('../db/index')
//导入全局的token配置文件
const config = require('../config')
// 导入jwt包
const jwt = require('jsonwebtoken')

//添加用户浏览记录 body: 音乐id 音乐名 name 作者author auth: 浏览此音乐的用户
exports.addHistory = (req, res) => {
    const username = req.auth.username
    //查找有没有这个用户
    const sqlStr = 'select * from users where username=?'
    db.query(sqlStr, [username], (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length === 0) {
            return res.cc('修改失败，请稍后再试')
        } else if (results.length === 1) {
            //找到了这个用户,查找这个用户之前是否播放过这个歌曲
            //TODO:这里要改，代码重复了
            const str = 'select * from history where username=? and id=?'
            db.query(str, [username, req.body.id], (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.send({ status: 1, message: err.message })
                if (results.length == 0) {
                    console.log('11');
                    const addStr = 'insert into history set ?'
                    db.query(addStr, { ...req.body, username }, (err, results) => {
                        // 执行 SQL 语句失败
                        if (err) return res.send({ status: 1, message: err.message })
                        // SQL 语句执行成功，但影响行数不为 1
                        if (results.affectedRows !== 1) {
                            return res.send({ status: 1, message: '添加历史记录失败！' })
                        }
                        console.log(results);
                        res.send({
                            status: 0,
                            message: '添加历史记录成功'
                        })
                    })
                } else {
                    //之前有记录，删掉
                    (async function () {
                        const delStr = 'delete from history where id=? and username=?'
                        let res = await db.query(delStr, [req.body.id, username], (err, results) => {
                            console.log('删了');
                            console.log(results);
                        })
                        console.log('执行了');

                    })()
                    setTimeout(() => {
                        const addStr = 'insert into history set ?'
                        db.query(addStr, { ...req.body, username }, (err, results) => {
                            // 执行 SQL 语句失败
                            if (err) return res.send({ status: 1, message: err.message })
                            // SQL 语句执行成功，但影响行数不为 1
                            if (results.affectedRows !== 1) {
                                return res.send({ status: 1, message: '添加历史记录失败！' })
                            }
                            console.log(results);
                            res.send({
                                status: 0,
                                message: '添加历史记录成功'
                            })
                        })
                    }, 500);

                }
            })

        }
    })
}

//获取用户浏览记录 只需要token，不需要其他参数
exports.getHistory = (req, res) => {
    const username = req.auth.username
    const str = 'select * from history where username=? order by num desc '
    db.query(str, [username], (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数等于0
        if (results.length == 0) return res.send({
            status: 2,
            message: '无浏览记录'
        })

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取浏览记录成功！',
            data: results,
        })
    })
}