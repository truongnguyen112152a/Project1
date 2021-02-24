const mongoose = require('../config/connectDB')
let userSchema = {
    email: String,
    username: String,
    age: Number,
    phone: Number,
    password: Number
}
let model2 = mongoose.model("user", userSchema)

module.exports = model2