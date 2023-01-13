const signUp = require('../models/signUp')

exports.postUser = async(req, res)=>{
    const {name, email, password} = req.body
    try {
        const newuser = await signUp.create({
            name:name,
            email:email,
            password:password
        })
        res.status(201).json(newuser)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}
exports.getAllUsers = async (req, res)=>{
    try {
        const allUsers = await signUp.find()
        res.json(allUsers)
    } catch (err) {
        console.log(err);
    }
}
exports.getUser =async (req, res)=>{
    try {
        const user = await signUp.findById(req.params.id)
        res.json(user)
    } catch (err) {
        console.log(err);
    }
}
exports.editUser =async(req, res)=>{
    try {
        const user = await signUp.findById(req.params.id)
        console.log(user);
        let result
        if(req.body){
            result = req.body
        }
        let data = {
            name:result?.name || user.name,
            password:result?.password || user.password,
            email:result?.email || user.email
        }
        const updateUser = await signUp.findByIdAndUpdate(req.params.id, data, {new:true})
        updateUser.save()
        res.json(updateUser)
    } catch (err) {
        console.log(err);
    }
}
exports.deleteUser = async(req, res)=>{
    try {
        const deleteBlog = await signUp.findById(req.params.id)
        await deleteBlog.remove()
        res.status(200).json(deleteBlog)
    } catch (err) {
        console.log(err);
    }
}