const userSchema = require('../model/userSchema');
//const auth = require('../Middlewares/auth')

const user = require('express').Router()

user.get('/', async (req, res)=>{
    try{
        const user = await userSchema.find()
        res.json(user)

    }catch(err){
        if(err){
            console.log(err.message)
            res.json({error : err.message})
        }else{
            console.log('server side error')
            res.json({error : 'server side error'})
        }
    }
})

user.post('/', async (req, res)=>{
    try{
        const {username, password} = req.body;
        const users = await new userSchema({
         username, password
    })
    await users.save()
    res.json(users)

    }catch(err){
        if(err){
            console.log(err.message)
            res.json({error : err.message})
        }else{
            console.log('server side error')
            res.json({error : 'server side error'})
        }
    }
    
})



module.exports = user;