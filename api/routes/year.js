var express = require('express');
const { response } = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbname = "Stock";



router.get('/', function(req, res, next) {
    res.send("Connected!");
});

router.post('/', function(req, res, next) {
    var results = [];
    var field = req.body.field;
    const collname = req.body.company;
    
    MongoClient.connect(url,function(err,client){
   
        if(!err){
          const results = [];
         const db = client.db(dbname);
         const collection = db.collection(collname);
          // get aggregate by matching all values and grouping them as years
         collection.aggregate([{"$match":{}},{"$group":{_id:"$year",average:{"$avg":"$"+field}}}]).toArray(function(err,todos){
                        if(!err){
                         todos.forEach(function(todo){
                                
                           results.push(todo);
                           
                        });
   
                        res.json(results.sort(function(a,b){
                          return a._id - b._id;
                        }));
                        }
         });
         client.close();
            }
   });
});



module.exports = router;

