const router = require('express').Router()
const userController = require('../controller/userController')
const productcontroller = require('../controller/productcontroller')
const loginController = require('../controller/loginController')
const Auth = require('../Middlewares/auth')

router.get('/', (req, res)=>{
    res.json({message : 'api working'})
})

router.post('/login', loginController)
router.use('/user', userController )
router.use('/product', Auth, productcontroller )

module.exports = router