const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } = process.env;
const DB = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@cluster0.aynlyhe.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`

module.exports = DB