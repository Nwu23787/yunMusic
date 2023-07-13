const express = require('express')
const router = express.Router()

const history = require('../router_handler/history')

//添加历史记录
router.post('/add', history.addHistory)
//获取历史记录
router.post('/get', history.getHistory)

module.exports = router