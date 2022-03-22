const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');
let name
let surName
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
      isim: "mert",
      yas:"22"
  })
})


app.post('/gonder', (req, res,next) => {
     name = req.body['name'];
     surName = req.body['surName'];
    //res.send(`Name : ${name} - Surname : ${surName}`);
    console.log(`Name : ${name} - Surname : ${surName}`);

  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})