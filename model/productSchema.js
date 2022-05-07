const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title : {type : String, required : true},
    color:{type : String},
    price:{type : String},
    description : {type : String, required : true},

    date : {type : Date, default : Date.now()}
})

const products = new mongoose.model('product', productSchema)
module.exports = products