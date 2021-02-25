const express = require('express')
const router = express.Router()
const path = require('path')

const user = require('./user')

router.use('/user', user)

router.get('/sign-up',(req,res) => {
    res.sendFile(path.join(__dirname,"../views/signUp.html"))
})
router.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,"../views/login.html"))
})
router.get('/home',(req,res) => {
    res.sendFile(path.join(__dirname,"../views/home.html"))
})
router.get('/detail/:id',(req,res) => {
    res.sendFile(path.join(__dirname,"../views/detail.html"))
})
module.exports = router

