const express = require("express")
const app= express()
const path= require("path")
const hbs=require("hbs")
const port = process.env.PORT || 3000
const templatePath =path.join(__dirname ,'../templates')
const collection = require("./mongodb")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")
app.set("views",templatePath)


app.post("/login", async(req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.name})
        if (check.password ===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong Password")
        }
    }
    catch{
        res.send("Wrong Details")
    }

})

app.post("/signup", async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")
})

app.listen(port,()=>{
    console.log("port connected")
})
