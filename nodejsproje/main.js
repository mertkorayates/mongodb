const mongoose = require("mongoose");
const express = require('express');
const app = express();

var User = require("./mongodb-test/schema.js")

mongoose.connect("mongodb://127.0.0.1:27017/nodejsproje?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",(err)=>{
    if(!err){
        console.log("connected")
    }else{
        console.log("ERROR")
    }
});



app.get("/ekle",(req,res)=>{
    var deneme1 = new User({
        ad : "Deneme",
        soyad : "denemesoy",
        yas : "12314",
    })

    deneme1.save().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("Hataa")
    })
})




app.get("/ekle/:isim",(req,res)=>{
        console.log(req.params.isim );
        User.find({ad: req.params.isim }).then((result)=>{
            res.send(result);
        }).catch((err)=>{
            console.log("errr")
        })
})




app.get("/all",(req,res)=>{
    console.log(req.params.isim );
    User.find({ }).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log("errr")
    })
})

app.listen(3000);
