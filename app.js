const express = require('express')
const {MongoClient} = require('mongodb')
const app = express()
app.get('/' , (req, res)=>{
    res.status(200).send("hello from server side")
})
module.exports = app

