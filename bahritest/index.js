const express = require('express');
const app = express();


app.get("/deneme",(req,res)=>{
    console.log(`GELEN DENEME`)
})

app.get("/deneme1",(req,res)=>{
    console.log(`GELEN DENEME`)
})



app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`)
  })