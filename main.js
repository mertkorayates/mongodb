const mongoose = require("mongoose");
const express = require('express');
const app = express();

var User = require("./mongodb-test/schema.js")

mongoose.connect("mongodb+srv://sunucu:sanane914@cluster0.utxug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err)=>{
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




app.get("/ekle/:isim/:soyad/:yas",(req,res)=>{
    var deneme2 = new User({
        ad : req.params.isim,
        soyad : req.params.soyad,
        yas : req.params.yas,
    })

    deneme2.save().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log("Hataa")
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
