const mongoose = require("mongoose");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
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
        ad : "Mert",
        soyad : "Ates",
        yas : "99",
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




//  app.get("/all",(req,res)=>{
//     console.log(req.params.isim );
//     User.find({ }).then((result)=>{
//         res.send(result);
//     }).catch((err)=>{
//         console.log("errr")
//     })
// })




app.post("/espekle",(req,res,next)=>{
    try{
        kontrolEkleESP(req,res).then((data)=>{
            next();
        });
            
      

    } catch(err){
        console.log("ERR2");
        res.sendStatus(404)
    }
    
})






async function kontrolEkleESP(req,res) {
   await User.find({mac: req.body.mac }).then((result)=>{
    console.log(result[0].mac)
                                                        

    }).catch((err)=>{

    })
}

app.listen(3000);
