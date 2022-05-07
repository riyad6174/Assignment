const jwt = require('jsonwebtoken')
const userSchema = require('../model/userSchema')

// accept object only {username, password} from request.body.
// expected response = {key : ***token*** }
const loginController = async (req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await userSchema.findOne({ username, password})
        console.log(user)
        if(user){
            const {_id} = user;
            const key = jwt.sign({username, _id}, process.env.JWTKEY, {expiresIn : '7d'})
            res.json({key : `bearer ${key}`})
        }else{
            res.json({error : 'username or password incorrect!'})
            console.log('username or password incorrect!')
        }

    }catch(err){
        if(err){
            console.log(err.message)
            res.json({error : err.message})
        }else{
            console.log('server side error')
            res.json({error : 'server side error'})
        }
    }
}

module.exports = loginController;