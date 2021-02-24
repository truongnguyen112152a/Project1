const express = require('express')
const router = express.Router()
const path = require('path')

const user = require('./users')

router.use('/general-all', user)

router.get('/general',(req,res) => {
    res.sendFile(path.join(__dirname,"../views/user.html"))
})
router.get('/detail/:id',(req,res) => {
    res.sendFile(path.join(__dirname,"../views/detailUser.html"))
})
module.exports = router

