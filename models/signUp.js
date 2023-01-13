const mongoose = require('mongoose')
const schema = mongoose.Schema(
    {
        name:{type:String},
        email:{type:String},
        password:{type:String}
    })
module.exports= signUp = mongoose.model("Users", schema)