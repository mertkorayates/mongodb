const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect('mongodb://127.0.0.1:27017/proofons', {
  useNewUrlParser: true
});



const Schema = mongoose.Schema;
let kullaniciSchema = new Schema({
  kullaniciAd: String,
  eposta: String,
  numara: Number,
  sifre: String,
});

let Kullanici = mongoose.model('kullanici', kullaniciSchema);





app.post('/register', (req, res,next) => {
  try{

    Kullanici.find({ eposta: req.body.eposta}, (err, kullanicilar) => {
        if (err) throw err;

        if(kullanicilar[0] ){
            res.send("kullanici zaten kayitli")
            next();
        } else{
            Kullanici.create({ kullaniciAd: req.body.kullaniciAd, eposta: req.body.eposta, numara:req.body.numara, sifre: req.body.sifre }, (err, result) => {
                if (err) throw err;
                console.log(result);
                res.send("kayit basarili")
               next();
              });
        }
      });



    /*

Kullanici.create({ adi: req.body.adi, soyadi: req.body.soyadi, yasi:req.body.yasi, eposta: req.body.eposta }, (err, result) => {
        if (err) throw err;
        console.log(result);
       next();
      });
    */
  }catch(e){
    res.sendStatus(404)
  }


  
  
})


app.post("/login",(req,res,next)=>{
    try{
      Kullanici.find({eposta:req.body.eposta},(err,kullanicilar)=>{
        if (err) throw err;
         
          if(kullanicilar[0]){
            if(kullanicilar[0]["sifre"] === req.body.sifre ){
              res.send(kullanicilar)
              next();
          }
          else{
            res.send("eposta veya sifre yanlis")
            next();
          }
          }
          
          else{
            res.send("kayitli degil")
            next();
          }
      })

    }catch(e){
      res.sendStatus(404)
    }
})


app.listen(3000)

