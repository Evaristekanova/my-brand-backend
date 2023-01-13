const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name:'ddvnlfyfu',
    api_key: '545551784481917',
    api_secret:'0Beb-U_lBn-0go9sPMhnpDomFr8'
})

module.exports = cloudinary