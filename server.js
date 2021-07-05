const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require('mongoose')

const routeUrls= require('./routes/routes')


mongoose.connect(process.env.DATABASE_URL, (err) =>{
    if(err){
        console.log('Database not connected')
    }
    else{ 
        console.log('Successful connection to database established')
    }
})

const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(cors())

app.use('/api',routeUrls)


app.listen(process.env.PORT, () =>{
    console.log(`Server successfully running at: ${process.env.PORT}`)
})






