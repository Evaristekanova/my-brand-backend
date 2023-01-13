const express = require('express')
const mongoose = require('mongoose')
const signUp = require('./models/signUp')
const cloudinary = require('./store/cloudinary')
const upload = require('./store/multer')
const blogControllers = require('./controllers/blogController')
const signUpControllers = require('./controllers/signupController')
const msgControllers = require('./controllers/messageController')
require('dotenv').config()
const app = express()
app.use(express.json())

//==============batabase connection=========// 
const DB = require('./connection/connection');
mongoose.set('strictQuery', true)
mongoose.connect(DB, {
    useNewUrlParser:true
}).then(()=>console.log('connected')).catch(err=>console.log(err))
app.use(express.json())

// ============================BLOGS ENDPOINT ===================//
// ============== post a blog ===========//
// app.use(blogRouter)
app.post("/blog", upload.single("image"), blogControllers.postBlog);
  app.get('/blog', blogControllers.getAllBlogs)
app.get('/blog/:id', blogControllers.getSingleBlog)
app.delete('/blog/:id', blogControllers.deleteBlog)
app.put('/blog/:id', blogControllers.updateBlog);


// ============================ MESSAGE ENDPOINT ===================//
app.post('/message', msgControllers.postMgs)
app.get('/message', msgControllers.getAllMsg)
app.get('/message/:id', msgControllers.getMsg)
app.delete('/message/:id', msgControllers.deleteMsg)

// ============================ signup ENDPOINT ===================//

// =========post a user ========//
app.post('/signup', signUpControllers.postUser)
app.delete('/signup/:id', signUpControllers.deleteUser)
app.get('/signup', signUpControllers.getAllUsers)
// ======== get a user =========//
app.get('/signup/:id', signUpControllers.getUser)
// ======update user======//
app.put('/signup/:id', signUpControllers.editUser)
app.listen(8000, ()=>{
    console.log('server is running...')
})