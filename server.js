const express = require('express')
const app = express()
var port = 3003

const router = require('./router/index')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', router)

app.listen(port,() => console.log(`server connect port ${port}`))