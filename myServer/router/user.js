const express = require('express')
const router = express.Router()

const register = require('../router_handler/user')

router.post('/register', register.regUser)
router.post('/login', register.login)
router.post('/getCode', register.getCode)
router.post('/getInfo', register.getInfo)
router.post('/update/username', register.updateUsername)
router.post('/update/password', register.updatePassword)

module.exports = router