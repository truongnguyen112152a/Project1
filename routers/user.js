const express = require('express')
const router = express.Router()
const user = require('../services/serviceControl')

router.post("/",(req,res) => {
    var email = req.body.email
    var username = req.body.username
    var phone = req.body.phone
    var school = req.body.school
    var password = req.body.password
    var obj = {
        email,
        username,
        phone,
        school,
        password,
    }
    user.existsLogin(email)
    .then((data) => {
        if(!data) {
            return user.createUser(obj)
            .then((data) => {
                res.json({
                    error: false,
                    messenge: "tạo dữ liệu thành công",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    messenge: err
                })
            });
        }
        res.json({
            error: true,
            messenge: "email này đã tồn tại"
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })
    });
})
router.get("/",(req,res) => {
    user.getUser()
    .then((data) => {
        res.json({
            error: false,
            messenge: "hiển thị toàn bộ dữ liệu thành công",
            value: data
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })   
    });
})
router.get("/detail/:id",(req,res) => {
    user.getUserID(req.params.id)
    .then((data) => {
        res.json({
            error: false,
            messenge: "hiển thị dữ liệu thành công",
            value: data
        })
    }).catch((err) => {
        res.json({
            error: true,
            messenge: err
        })   
    });
})
router.get("/sign-up/:email/:pass",(req,res) => {
    user.existsSignUp(req.params.email,req.params.pass)
    .then((data) => {
        if(data) {
            return user.getUserSignUp(req.params.email,req.params.pass)
            .then((data) => {
                res.json({
                    error: false,
                    messenge: "tài khoản này đã tồn tại",
                    value: data
                })
            }).catch((err) => {
                res.json({
                    error: true,
                    messenge: err
                })   
            });            
        }
        return res.json({
            error: true,
            messenge: "không tồn tại tài khoản này"
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
    var phone = req.body.phone
    var school = req.body.school
    var password = req.body.password
    var obj = {
        email,
        username,
        phone,
        school,
        password,
    }
    user.updateUser(req.params.id,obj)
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
    user.deleteUser(req.params.id)
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