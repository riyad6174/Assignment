const product = require('express').Router()
const productSchema = require('../Model/productSchema')


// get all local product 
// accept nothing.
product.get('/', async (req, res)=>{
    try{
        const allproduct = await productSchema.find()
        res.json(allproduct)

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





// user can create a product,
// only login user will create there post of this route.
// accept object only {title, description, image, type{'lost' or 'found'}} from request.body;
product.post('/', async (req, res)=>{
    try{
        const user = req._id;
        const {title, color, price,description} = req.body;
        const posts = await new productSchema({
        user, title, color,price,description
    })
    await posts.save()
    res.json(posts)

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
product.get('/:id', async (req, res)=>{
    try{
    const productId = req.params['id']
        const oneProduct = await productSchema.findOne({_id : productId})
        console.log(oneProduct)
        res.json(oneProduct)

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

// update one post who already login and created there post.
// only login user will be update there post of this route.
// accept object only {title, description, image and postId} from request.body;
product.put('/:id', async (req, res)=>{
    try{
        
        const {title, color,price,description} = req.body;
        const updatePost = await productSchema.updateOne({ _id : req.params.id},{ $set : {title, color,price,description}})
        res.json(updatePost)

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

// only login user will be delete there post of this route.
// accept object only {postId} from request.body;
product.delete('/:id', async (req, res)=>{
    try{
        
        
       
        const deletePost = await productSchema.findByIdAndDelete(req.params.id)
        if(!req.params.id) {
            return res.status(400).send()
        }
        res.json(deletePost)

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

module.exports = product;

// try{
//     const user = req._id;
//     const {postId } = req.body;
//     console.log(postId)
//     const deletePost = await postSchema.deleteOne({user, _id : postId}) 
//     res.json(deletePost)

// }catch(err){
//     if(err){
//         console.log(err.message)
//         res.json({error : err.message})
//     }else{
//         console.log('server side error')
//         res.json({error : 'server side error'})
//     }
// }