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
  var year = req.body.year;
  var field = req.body.field;

MongoClient.connect(url,function(err,client){
   
     if(!err){
       const results = [];
      const db = client.db(dbname);
      const collection = db.collection(collname);
      //get aggregate by matching year and group them on the monthly basis
      collection.aggregate([{"$match":{"year": year}},{"$group":{_id:"$month",average:{"$avg": "$"+field}}}]).toArray(function(err,todos){
                     if(!err){
                      todos.forEach(function(todo){
                             
                        results.push(todo);
                        
                     });
                     var monthNames = {
                      "Jan": 1,
                      "Feb": 2,
                      "Mar": 3,
                      "Apr": 4,
                      "May": 5,
                      "Jun": 6,
                      "Jul": 7,
                      "Aug": 8,
                      "Sept": 9,
                      "Oct": 10,
                      "Nov": 11,
                      "Dec": 12
                    };
                    
                     

                     res.json(results.sort(function(a,b){
                      return monthNames[a._id] - monthNames[b._id];
                     }));
                     }
      });
      client.close();
         }
});
});
module.exports = router;

