const mongoose = require('mongoose')
const express = require('express')
const app = express()
const DB = require('./connection/connection')
app.use(express.json())
mongoose.set('strictQuery', true)
mongoose.connect(DB, {
    useNewUrlParser:true
}).then(()=>console.log('connected')).catch(err=>console.log(err))

const schema = mongoose.Schema(
    {
        title:'string',
        description:"string"
    })
const postRequest = mongoose.model('post', schema)


// ========post request ========//
app.post('/', async(req, res)=>{
    console.log(req.body);
    const {title, description} = req.body
    try {
        const newPost = await postRequest.create({title, description})
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).send(error)
    }
})
// ======== get all posts ========//
app.get('/', async(req, res)=>{
    try {
        const allPosts = await postRequest.find()
    res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).send(error)
    }
})

// ======== get a post ========//
app.get('/:id', async(req, res)=>{
    const {id} = req.params
    try {
        const aPost = await postRequest.findById(id)
        res.status(200).json(aPost)
    } catch (error) {
        res.status(500).send(error)
    }
})
app.patch('/:id', async(req, res)=>{
    const {id} = req.params
    const {title} = req.body
    try {
        const update = await postRequest.findByIdAndUpdate(id,{title})
        res.status(204).json(update)
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(8000, ()=>{
    console.log('server is running...')
})