const express = require('express')
const router = express.Router()
const service2 = require('../services/serviceControl')

router.post("/",(req,res) => {
    var email = req.body.email
    var username = req.body.username
    var age = req.body.age
    var phone = req.body.phone
    var password = req.body.password
    var obj = {
        email,
        username,
        age,
        phone,
        password,
    }
    service2.createUser(obj)
    .then((result) => {
        res.json({
            error: false,
            messenge: "tạo dữ liệu thành công",
            value: result
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })
    });
})
router.get("/",(req,res) => {
    service2.getUser()
    .then((data) => {
        res.json({
            error: false,
            messenge: "hiển thị tất cả dữ liệu thành công",
            value: data
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })   
    });
})
router.get("/:id",(req,res) => {
    service2.getUserID(req.params.id)
    .then((data) => {
        res.json({
            error: false,
            messenge: "hiển thị tất cả dữ liệu thành công",
            value: data
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })   
    });
})
router.put("/:id",(req,res) => {
    var email = req.body.email
    var username = req.body.username
    var age = req.body.age
    var phone = req.body.phone
    var password = req.body.password
    var obj = {
        email,
        username,
        age,
        phone,
        password,
    }
    service2.updateUser(req.params.id,obj)
    .then((data) => {
        res.json({
            error: false,
            messenge: "cập nhật dữ liệu thành công",
            value: data
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })   
    });
})
router.delete("/:id",(req,res) => {
    service2.deleteUser(req.params.id)
    .then((data) => {
        res.json({
            error: false,
            messenge: "xóa dữ liệu thành công"
        })        
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })         
    });
})
module.exports = router