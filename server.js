const express = require('express')
const app = express()
const env = require('dotenv').config()
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require('./Routers/router')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));


app.get('/', (req, res)=>{
    res.json({'message' : 'server is working'})
})

app.use('/api', router)

app.listen(port, ()=>{
    console.log(`server running at ${port}`)
    mongoose.connect(process.env.DBURL, (err)=>{
        if(err){
            console.log('db connection error')
        }else{
            console.log('db connected')
        }
    })
})