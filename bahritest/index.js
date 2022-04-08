const express = require('express');
const app = express();
const http = require('http');

app.get("/deneme",(req,res)=>{
    console.log(`GELEN DENEME`)
})

app.get("/deneme1",(req,res)=>{
    console.log(`GELEN DENEME`)
})




server.listen(3000, () => {
    console.log('listening on *:3000');
  });