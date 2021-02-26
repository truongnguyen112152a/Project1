const userModel = require('../database/models/userModel')

function getUser() {
    return userModel.find()
}
function getUserID(data) {
    return userModel.find({
        _id: data
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
function existsSignUp(data) {
    return userModel.exists({
        email: data
    })
}
function existsLogin(data1,data2) {
    return userModel.exists({
        email: data1,
        password: data2
    })
}
module.exports = {
    getUser,
    getUserID,
    createUser,
    updateUser,
    deleteUser,
    existsLogin,
    existsSignUp
}