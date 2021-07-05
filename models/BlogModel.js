const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
   
    title:{
        type: String,
        required: true
    },

    image:{
        type: String,
        required: true,
    },

    author:{
        type: String,
        required: true,

    },
    content:{
        type:String,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    views:{
        type: Number,
        default: 0
    }


})


module.exports = mongoose.model("Blogs", blogSchema)
