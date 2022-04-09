const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const io = require('socket.io')(server);
var bodyParser = require('body-parser');
const { json } = require('express/lib/response');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
//mongodb://admin:Sanane914@37.148.211.44:27017/proofons?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

mongoose.connect('mongodb://127.0.0.1:27017/fisho', {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;
let devices = new Schema({
  mac: String,
  adjTemps: String,
  manuelHeart: String,
  temps: [String],
});

let device = mongoose.model('devices', devices);

app.get('/', (req, res) => {









  res.sendStatus(200);
});

io.on('connection', (socket) => {
        console.log("CONNECT")
        socket.on("datalar",(uuid)=>{
          console.log(`Gelen UUİD ${uuid}`)
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
          
          device.findOneAndUpdate(result,{$push:{temps:req.body.TEMP}},(err,resx)=>{
             
            res.send({"adjTemps":resx["adjTemps"],"manuelHeart":resx["manuelHeart"]})
          })
         
         console.log(result[0].mac)
        } 
        else{
          device.create({mac:req.body.MAC,adjTemps:"",manuelHeart:"",temps:[req.body.TEMP]},(err,resx)=>{
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