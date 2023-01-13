const mongoose = require('mongoose')
const schema = mongoose.Schema(
    {
        firstName:{type:String},
        secondName:{type:String},
        email:{type:String},
        messages:{type:String}
    })
module.exports= message = mongoose.model("messages", schema)