var express = require('express');
const { response } = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbname = "Stock";
const collname = "Users";


router.get('/', function(req, res, next) {
  res.send("Connected!");
});


router.post("/", function(req,res,next){


  const email = req.body.email;  
  const username =  req.body.username;
  const password = req.body.password;
//register the user with the given fields
MongoClient.connect(url,function(err,client){
   
     if(!err){

      const db = client.db(dbname);
      const collection = db.collection(collname);

      collection.insertOne({"email":email,"username" : username , "password":password}).then(()=>{
            res.send("succ");
      }).catch(()=>{
          console.log("Err!");
      })
     
      client.close();
         }
});
});
module.exports = router;

