const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
let name
let mac
let temps=[];
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
      isim: "mert",
      yas:"22"
  })
})


app.post('/gonder', (req, res) => {
     temps.push(req.body['temp'])
    res.json({
      name: "Mert Koray",
      mac:"12:32:41:AA",
      temps:temps
      
    })
    
  
    
  })

  app.get('/tempdata',(req,res)=>{
    res.json({
      name: "Mert Koray",
      mac:"12:32:41:AA",
      temps:temps
    })
  
  })



app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})