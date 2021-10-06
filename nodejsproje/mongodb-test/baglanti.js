const mongoose = require("mongoose");

var User = require("./schema.js")
 mongoose.connect("mongodb+srv://mertPc:sanane914@cluster0.utxug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",(err)=>{
    if(!err){
        console.log("connected")
    }else{
        console.log("ERROR")
    }
});

var user1 = new User({
    ad : "Mert Koray",
    soyad : "Ates",
    yas : "22",
})


//kaydetme

user1.save((err)=>{
    if(err){
        console.log("Kullanici Eklenmedi");
    } else{
        console.log("Kullanici Eklendi")
    }
})


// arama

// User.find({},(err,data)=>{
//     if(err){
//         console.log("ERROR")
//     }else{
//         console.log(data)
//     }
// })

// ID ile bilgi cekme


// User.findById("615c8f5f0b4e3544d7e527b3",(err,data)=>{
//     if(err){
//         console.log("ERROR")
//     }else{
//         console.log(data)
//     }
// })

// Veri Guncelleme

// User.findById("615c8f5f0b4e3544d7e527b3",(err,data)=>{
//     if(err){
//         console.log("ERROR")
//     }else{
//         data.yas = "99";

//         data.save((err)=>{
//             if(!err){
//                 console.log("Update")
//             }
//         })
        
//     }
// })

// Veri Silme

// User.findById("615c8f5f0b4e3544d7e527b3",(err,data)=>{
//     if(err){
//         console.log("ERROR")
//     }else{


//         data.remove((err)=>{
//             if(!err){
//                 console.log("Remove")
//             }
//         })
        
//     }
// })






//mongoose.connect("mongodb://127.0.0.1:27017//nodejsproje");

