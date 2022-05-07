const jwt = require('jsonwebtoken')

// accept headers {key} from request.headers;
const Auth = async (req, res, next) =>{
    const{key}= req.headers;
    try{
        if(key){
            const pureKey = key.split(' ')[1]
            const check = jwt.verify(pureKey, process.env.JWTKEY)
            if(check){
                const {username, _id} = jwt.decode(pureKey)
                req._id = _id
               
                req.username = username
                next()
            }
        }else{
            console.log('auth key missing')
            return res.json({error : "unauthorized"})
        }
    }catch(err){
        if(err){
            console.log(err.message)
           return res.json({error : err.message})
        }else{
            console.log('server side error')
          return res.json({error : 'server side error'})
        }
    }
    
}

module.exports = Auth;