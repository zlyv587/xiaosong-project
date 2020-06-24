const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const routes = require('./routes')

const {port} = require('../app.config')
const app = express()



//解析我们的form表单提交的数据,Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//解析json数据格式
app.use(bodyParser.json())  
//设置跨域
app.use(cors())
//导入自定义路由
app.use('/', routes)


const server = app.listen(port, () => {
  console.log('Server SUCCESS');
})
