const mongoose2 = require('mongoose')
mongoose2.connect('mongodb://localhost:27017/general-users',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

module.exports = mongoose2