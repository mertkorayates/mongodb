const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer();
const mongoose = require('mongoose');
const io = require('socket.io')(server);
var bodyParser = require('body-parser');

//const io = require("socket.io")(server);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
//mongodb://admin:Sanane914@37.148.211.44:27017/proofons?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

mongoose.connect('mongodb://admin:Sanane914@37.148.211.44:27017/fisho?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true
}).then((gek)=>console.log(gek))

const Schema = mongoose.Schema;
let devices = new Schema({
  mac: String,
  adjTemps: String,
  manuelHeart: String,
  socketId: String,
  temps: [String],


});

let device = mongoose.model('devices', devices);

app.get('/', (req, res) => {
  res.send("deneme");
});

io.on('connection', (socket) => {
      socket.emit("deneme","naber")
       socket.on("writeTemp",(msg)=>{
        console.log(msg)
        
          
       /*

device.findOneAndUpdate({mac:msg.mac},{adjTemps:msg.adjTemps,socketId:socket.id},(err,dat)=>{
         if(err){
           console.log(err)
         }
         console.log(dat)
       })

       */



      })

      socket.on("onHeart",(msg)=>{

        device.findOneAndUpdate({mac:msg.mac},{manuelHeart:"11",socketId:socket.id},(err,dat)=>{
          if(err){
            console.log(err)
          }
          console.log(dat)
        })
 
 
 
       })

       socket.on("offHeart",(msg)=>{

        device.findOneAndUpdate({mac:msg.mac},{manuelHeart:"00",socketId:socket.id},(err,dat)=>{
          if(err){
            console.log(err)
          }
          console.log(dat)
        })
 
 
 
       })

});

app.post("/gelen",(req,res)=>{
   // console.log(`Gelen Data = ${req.body.username}`)
    io.emit('chat message', `${req.body.username}`);
    res.sendStatus(200)
})



app.get("/registeresp/:MAC/:UUID",(req,res)=>{
   try{
    console.log(`Gelen Data MAC ${req.params.MAC}`)
    console.log(`Gelen Data UUID ${req.params.UUID}`)
   
    res.sendStatus(200) 
   } catch (e){
    res.sendStatus(302) // Found
   }
})


app.post("/datapush",(req,res,next)=>{
     try{
      device.find({mac:req.body.MAC},(err,result)=>{
        if(result.length >= 1){
     
          device.findOneAndUpdate({mac: result[0].mac},{$push:{temps:req.body.TEMP}},(err,resx)=>{
            io.emit(resx["mac"],{temps:resx["temps"]})
            io.emit(`${resx["mac"]} realtime`,{temps:req.body.TEMP})
            console.log(resx)
            res.send({"adjTemps":resx["adjTemps"],"manuelHeart":resx["manuelHeart"]})
          })
         
         console.log(result[0].mac)
        } 
        else{
          device.create({mac:req.body.MAC,adjTemps:"",manuelHeart:"",socketId:"",temps:[req.body.TEMP]},(err,resx)=>{
            console.log("YOKTU OLUSTURULDU")
            res.send({"adjTemps":resx["adjTemps"],"manuelHeart":resx["manuelHeart"]})
          })
        }
    })

     } catch(e){
        res.sendStatus(302) // Found
        next()
     }
})






app.get("/dataquery/:UUID",(req,res)=>{
    try{
        // Bluetooth uuid search data
        res.send(200)
    } catch(e){
        res.sendStatus(302) // Found
    }
})


app.listen(3000, () => {
  console.log('listening on *:3000');
});

server.listen(5000)