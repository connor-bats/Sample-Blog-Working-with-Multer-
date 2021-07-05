const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const BlogFormat = require('../models/BlogModel')

const storage = multer.diskStorage({
    destination : './public/images',
    filename: (req, file, cb) =>{
        cb(null, 'image' + "-"+Date.now()+path.extname(file.originalname))
    }


})


//Initilaise upload variable

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    
}).single('file')

// checkFileType = (file, cb) =>{

//     // Allowed 
//     const fileTypes = /jpeg|jpg|png|gif|jfif/
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = fileTypes.test(file.mimetype)

//     if(extname && mimetype){
//         return cb(null,true)
//     }
//     else{
//         cb('Invalid FileType')
//     }

// }



router.post('/',(req,res) =>{
    console.log(req.body.username)

    res.json({response:'Working fine'})
})


//Save new blog

router.post('/upload',(req,res) =>{
    upload(req, res, (err) =>{
        if(err){
            res.json({msg:err})
        }
        else{
            if(req.file == undefined){
                res.json({msg: 'Error no file selected'})
            }

            else{
            console.log(req.file)
            
            const newBlog = new BlogFormat({
                title: req.body.title,
                author: req.body.author,
                content: req.body.content,
                image: '/images/'+req.file.filename


            })

            newBlog.save()
                .then(data=>{
                    res.status(200).json(data)
                })
                .catch(err =>{
                    res.status(204).json(err)
                })


        }
    }
    })
    

})



//Get all blogs 

router.get("/seeBlogs",async(req,res)=>{
    blog = await BlogFormat.find()
    if(blog === null){
        console.log("No records found")
        res.json({err:"No records found"})
    }

    else{
        res.json(blog)
    }
})



//Get a particular blog by id

router.get("/seeBlog/:id",async(req,res) =>{

    try{
        blog =await BlogFormat.findById(req.params.id)

        if(blog !== null){
        console.log(blog)
        blog.views = blog.views+1
        blog.save()
            .then(data =>{
                res.json(data)
            })
            .catch(err =>{
                res.json(err)
            })
    }

    else{
        res.json({error:"no such query found"})
    }

}
catch(err){
    res.json(err)
}
})



//Update a particular blog


router.patch("/updateBlog/:id",async(req,res) =>{

    try{
        blog = await BlogFormat.findById(req.params.id)

        if(blog !== null){
        blog.title = req.body.title
        blog.content = req.body.content
        blog.save()
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(204).json(err)
            })
    }

    else{
        res.status(204).json({error:"no such query found"})
    }

}
catch(err){
    res.status(204).json(err)
}
})



//Delete a particular blog

router.delete("/deleteBlog/:id", async(req,res) =>{


    try{
        const blog =await BlogFormat.findById(req.params.id)

        if(blog !== null){
        
        blog.remove()
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err =>{
                res.status(204).json(err)
            })
    }

    else{
        res.status(204).json({error:"no such query found"})
    }

}
catch(err){
    res.status(204).json(err)
}
})





module.exports = router
