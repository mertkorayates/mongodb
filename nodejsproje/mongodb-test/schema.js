const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

var userSchema = new Schema({
    ad : String,
    soyad : String,
    yas : String,
})

var User = mongoose.model("espnode",userSchema);



module.exports = User;










//mongoose.connect("mongodb://127.0.0.1:27017//nodejsproje");

