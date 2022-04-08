const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
//mongodb://admin:Sanane914@37.148.211.44:27017/proofons?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
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


app.post("/datapush",(req,res)=>{
     try{
            //Data push
          console.log(`Gelen MAC ID ${req.body.MAC}`)
          console.log(`Gelen UUID ID ${req.body.UUID}`)
          console.log(`Gelen Data SENSOR ${req.body.TEMP}`)
          console.log(`Gelen Data HEATER ${req.body.HEATER}`)
        res.send(200)
     } catch(e){
        res.sendStatus(302) // Found
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