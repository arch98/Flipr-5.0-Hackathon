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
var results = [];
  
  const username =  req.body.username;
  const password = req.body.password;

MongoClient.connect(url,function(err,client){
   
     if(!err){

      const db = client.db(dbname);
      const collection = db.collection(collname);
      //find document having the given username and password
      collection.findOne({"username" : username , "password":password}).then((response)=>{
          if(response == null){
            res.send("error!");
          }else{
            res.send("found");
          }    
      }).catch(()=>{
          res.send("error!");
      })
      client.close();
         }
});
});
module.exports = router;

