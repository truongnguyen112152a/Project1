const userModel = require('../database/models/userModel')

function getUser() {
    return userModel.find()
}
function getUserID(data) {
    return userModel.find({
        _id: data
    })
}
function getUserSignUp(data1,data2) {
    return userModel.find({
        email: data1,
        password: data2
    })
}
function createUser(data) {
    return userModel.create(data)
}
function updateUser(data1,data2) {
    return userModel.findOneAndUpdate({
        _id: data1
    },data2)
}
function deleteUser(data) {
    return userModel.deleteOne({
        _id: data
    })
}
function existsLogin(data) {
    return userModel.exists({
        email: data
    })
}
function existsSignUp(data1,data2) {
    return userModel.exists({
        email: data1,
        password: data2
    })
}
module.exports = {
    getUser,
    getUserID,
    getUserSignUp,
    createUser,
    updateUser,
    deleteUser,
    existsLogin,
    existsSignUp
}