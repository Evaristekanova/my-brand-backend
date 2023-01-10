const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
// console.log(process.env);
const DB = `mongodb+srv://Evariste:4rmYShbfBH1dN7Dh@cluster0.aynlyhe.mongodb.net/brand?retryWrites=true&w=majority`

module.exports = DB