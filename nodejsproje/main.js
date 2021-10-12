const mongoose = require("mongoose");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var User = require("./mongodb-test/schema.js");
app.use(bodyParser.json());
var id;
var db;
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



app.get("/phoneall",(req,res)=>{
    User.find({},(err,data)=>{
    if(err){
        console.log("PHONE ALL ERR")
    }else{
        res.send(data);
    }
})

})


app.post("/espekle",(req,res)=>{
    try{
        console.log(req.body.mac)
         User.find({mac: req.body.mac }).then((result)=>{
            console.log(result)
             id = result[0].id;
            //result[0].adc.push(req.body.adc);  
            adcSave(req,res);                                
        
            }).catch((err)=>{
                var user1 = new User({
                    mac : req.body.mac,
                    adc : [req.body.adc],
                    value : req.body.value,
                
                })
                user1.save((err)=>{
                    if(err){
                        console.log("Kullanıcı Eklenmedi")
                        res.sendStatus(404);
                    }else{
                        console.log("Kullanıcı Eklendi")
                        res.sendStatus(200);
                    }
                })
            })

        
            
      

    } catch(err){
        console.log("ERR2");
        res.sendStatus(404)
    }


    
});



function adcSave(req,res) {
    User.findById(id,(err,data)=>{
        if(err){
            console.log("findById ERROR")
            res.sendStatus(404)
        }else{
           data.adc.push(req.body.adc)
           data.value = req.body.adc;
    
            data.save((err)=>{
                if(!err){
                    console.log("Update ERR")
                    res.sendStatus(404)
                }
            })
            
        }
    })
}


app.listen(3000);
