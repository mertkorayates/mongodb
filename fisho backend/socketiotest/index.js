const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  res.sendStatus(200);
});

io.on('connection', (socket) => {
        console.log("CONNECT")
  });

app.post("/gelen",(req,res)=>{
   // console.log(`Gelen Data = ${req.body.username}`)
    io.emit('chat message', `${req.body.username}`);
    res.sendStatus(200)
})



app.get("/registeresp/:MAC/:UUID",(req,res)=>{
   try{
    console.log(`Gelen Data ID ${req.params.MAC}`)
    console.log(`Gelen Data ID ${req.params.UUID}`)
    res.sendStatus(200) 
   } catch (e){
    res.sendStatus(302) // Found
   }
})


app.post("/datapush/:MAC",(req,res)=>{
     try{
            //Data push
        console.log(`Gelen Data MAC ${req.params.MAC}`)
        console.log(`Data Push Gelen  = ${req.body.username}`)
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


server.listen(3000, () => {
  console.log('listening on *:3000');
});
