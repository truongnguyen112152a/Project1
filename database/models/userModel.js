const mongoose = require('../config/connectDB')
let userSchema = {
    email: String,
    username: String,
    phone: Number,
    school: String,
    password: Number
}
let model = mongoose.model("user", userSchema)

module.exports = model