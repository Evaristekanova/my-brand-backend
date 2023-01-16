
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {type: String,},
    shortDescription: {type: String,},
    fullDescription: {type: String,},
    imageUrl: {
      type: String,
    },
    cloudinary_id:{
      type: String,
    },
});
const blopPost = mongoose.model('blogs', schema);
module.exports= blopPost
