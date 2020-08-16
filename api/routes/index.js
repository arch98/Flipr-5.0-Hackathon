var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbname = "Stock";


router.get('/', function(req, res, next) {
         res.send("Connected!");            
});


router.post('/', function(req, res, next) {
   var results = [];
   var year = req.body.year;//year
   var field = req.body.field;//field
   var month = req.body.month;//month
   const collname = req.body.company;//company
   MongoClient.connect(url,function(err,client){
      if(!err){

        const results = [];
        const db = client.db(dbname);
        const collection = db.collection(collname);

        //the aggregate matching by year and month and grouping the avg on a day to day basis
        collection.aggregate([{"$match":{"year":year,"month":month}},{"$group":{_id:"$day",average:{"$sum":"$"+field}}}]).toArray(function(err,todos){
                       if(!err){
                        todos.forEach(function(todo){
                        results.push(todo);
                        });
                      res.json(results.sort(function(a,b){return a._id -b._id; }));
                     }
        });
        client.close();
      }
  });
});


module.exports = router;
