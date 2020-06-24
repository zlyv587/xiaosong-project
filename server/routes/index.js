const express = require('express')
const boom = require('boom')

//导入jwt认证函数
const { jwtAuth } = require('../utils/login-jwt')

//注册路由 
const router = express.Router()
const { decode } = require('../utils/login-jwt')

//加入认证模块
router.use(jwtAuth)

//加入用户模块路由
router.use('/user', userRouter)


//自定义统一异常处理中间件，需要放在代码最后
router.use((err, req, res, next) => {
  //自定义用户认证失败的错误返回
  if (err && err.name === 'UnauthorizedError') {
    const { status = 401, message } = err
    //抛出401异常
    res.status(status).json({
      code: status,
      msg: 'token验证失效',
      data: {}
    })
  } else {
    const { output } = err || {}
    //错误码和错误信息
    const errCode = (output && output.statusCode) || 500
    const errMsg = (output && output.payload && output.payload.error) || err.message
    res.status(errCode).json({
      code: errCode,
      msg: errMsg
    })
  }
})

//导出路由
module.exports = router
