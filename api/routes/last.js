var express = require('express');
const { response } = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbname = "Stock";

router.get("/",function(req,res,next){
    res.send("Connected!");
})

router.post("/",function(req,res,next){

    const collname = req.body.company;
  
    MongoClient.connect(url,function(err,client){
   
        if(!err){
          const results = [];
         const db = client.db(dbname);
         const collection = db.collection(collname);
        //retrieve the last document inserted in the particular collection
         collection.find().limit(1).sort({"$natural":-1}).toArray(function(err,todos){
             if(!err){
                todos.forEach(function(todo){
                    res.send(todo);
                });
            }else{
                res.send("Error!")
            }
         });
        
         
         client.close();
        }
   });
});

module.exports = router;