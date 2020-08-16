const csv = require('csv-parser');
const fs = require('fs');
const results = [];
const total = [];
var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/";

fs.createReadStream('reliance.csv')
    .pipe(csv({}))
    .on('data',(data)=>{
        
          var date = data.Date.split("-");
           
          if(data.Open == "null"){
             data.Open = "0.00";
          }
           if(data.High ==  "null"){
             data.High = "0.00";
          }
           if(data.Adj == "null"){
            data.Adj = "0.00";
          }
           if(data.Volume == "null"){
            data.Volume = "0.00";
          }

          if(data.Low == "null"){
            data.Low = "0.00";
          }

          if(data.Close == "null"){
            data.Close = "0.00";
          }

          switch(date[1]){
            case "01":
              date[1] = "Jan"
              break;
            case "02":
              date[1] = "Feb"
              break;
            case "03":
              date[1] = "Mar"
              break;
              case "04":
              date[1] = "Apr"
              break;
            case "05":
              date[1] = "May"
              break;
            case "06":
              date[1] = "Jun"
              break;
              case "07":
                date[1] = "Jul"
                break;
              case "08":
                date[1] = "Aug"
                break;
              case "09":
                date[1] = "Sept"
                break;
                case "10":
                date[1] = "Oct"
                break;
              case "11":
                date[1] = "Nov"
                break;
              case "12":
                date[1] = "Dec"
                break;
                default:
                  date[1] = ""
          }

        var t = {
          "year":date[0],
          "month":date[1],
          "day":date[2],
          "open": parseFloat(data.Open),
          "high":parseFloat(data.High),
          "adj":parseFloat(data.Adj),
          "volume":parseFloat(data.Volume),
          "low":parseFloat(data.Low),
          "close":parseFloat(data.Close)
        }
       
        results.push(t);
    })
    .on('end',()=>{
        const user = "Stock";

        MongoClient.connect(url,function(err,client,){
            if(!err){
              const db = client.db(user);
              const collection = db.collection("Reliance");
       
              collection.insertMany(results).then(()=>{
                        console.log("DONE!");
                 }).catch(()=>{
                    console.log("ERROR!");
                 });
       
                 client.close();
               }
             });
        
    });

    