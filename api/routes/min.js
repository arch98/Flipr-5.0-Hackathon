var express = require('express');
const { response } = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbname = "Stock";



router.get('/', function(req, res, next) {
  res.send("Connected!");
});


router.post("/", function(req,res,next){
var results = [];
  
  const collname = req.body.company;
 

MongoClient.connect(url,function(err,client){
   
     if(!err){
       const results = [];
      const db = client.db(dbname);
      const collection = db.collection(collname);
      // get the minimum low for a year
      collection.aggregate([{"$match":{"year": "2020"}},{"$group":{_id:"$month",min:{"$min": "$low"}}}]).toArray(function(err,todos){
                     if(!err){
                      todos.forEach(function(todo){
                             
                        results.push(todo);
                        
                     });
                     res.json(results.sort(function(a,b){
                      return a.min - b.min;
                     }));
                     }
      });
      client.close();
         }
});
});
module.exports = router;






