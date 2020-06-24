const express = require('express')
const router = express.Router()
const md5 = require('../utils/md5')


const { login, findUser } = require('../services/users')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { decode } = require('../utils/login-jwt')


//登录
const loginVaildator = [
  body('username').isString().withMessage('用户名类型错误'),
  body('password').isString().withMessage('密码类型错误')
]

router.post('/login', loginVaildator, function (req, res, next) {
  const err = validationResult(req)
  //如果验证错误,empty不为空
  if (!err.isEmpty()) {
    //获取错误信息
    const [{ msg }] = err.errors
    //抛出错误,交给我们自定义的统一异常处理程序进行错误返回 
    next(boom.badRequest(msg))
  } else {
    let { username, password } = req.body;
    //md5加密
    password = md5(password)
    login(username, password).then(user => {
      if (!user || user.length === 0) {
        res.json({ code: -1, msg: '用户名或密码错误', data: {} })
      } else {
        //登录成功，签发一个token并返回给前端
        const token = jwt.sign(
          //playload：签发的 token 里面要包含的一些数据。
          { username },
          //私钥
          PRIVATE_KEY,
          //设置过期时间
          { expiresIn: JWT_EXPIRED }
        )
        res.json({ code: 0, msg: '登录成功', data: { token } })
      }
    })
  }
})


//查询用户信息
router.get('/info', function (req, res, next) {
  //解析token,并且token存在
  const token = decode(req) || {}
  findUser(token.username).then(user => {
    if (user) {
      res.json({ code: 0, msg: '用户信息查询成功', data: user })
    } else {
      res.json({ code: -1, msg: '用户信息查询失败', data: {} })
    }
  })
})

module.exports = router




