const userModel = require('../database/models/userModel')

function getUserID(data) {
    return userModel.find({
        _id: data
    })
}
function getUser() {
    return userModel.find()
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
function exists(data) {
    return userModel.exists(data)
}
module.exports = {
    getUser,
    getUserID,
    createUser,
    updateUser,
    deleteUser,
    exists
}