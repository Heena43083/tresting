var express = require('express');
var app = express();
var port = process.env.PORT ||7600;
var bodparser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient
var mongourl ="mongodb://localhost:27017";
var cors =  require('cors');
const { query } = require('express');
var db;



app.get('/health',function(req,res){
    res.send("Api is working")
    });


    
    app.get('/',function(req,res){
        res.send('<a href ="http://localhost:7600/location" target="_blank">city</a>  </br> <a href ="http://localhost:7600/mealtype" target="_blank">mealtype</a> </br>  <a href ="http://localhost:7600/restuarant" target="_blank">restuarant</a> </br>  <a href ="http://localhost:7600/cuisine" target="_blank">cuisine</a> </br>  <a href ="http://localhost:7600/order" target="_blank">orders</a>  </br> ')
        })
        


    
    //list of citys
    app.get('/location',function(req,res){
      db.collection('city').find().toArray(function(err,result){
          if (err) throw err;
          res.send(result)
      })
    })

    app.get('/mealtype',function(req,res){
      db.collection('mealtype').find().toArray(function(err,result){
          if (err) throw err;
          res.send(result)
      })
    })





    app.get('/restuarant',function(req,res){
      var query ={};
      if(req.query.city && req.query.mealtype){
          query={city:req.query.city,"type.mealtype":req.query.mealtype}
      }
        else if(req.query.city){
          query = {city:req.query.city}
        }else if(req.query.mealtype){
          query={"type.mealtype":req.query.mealtype}
      }
      else{
          query = {}
      }
      db.collection('restuarant').find(query).toArray(function(err,result){
          if (err) throw err;
          res.send(result)
      })
    })


    //restuarants details
app.get('/restuarantdetails/:id',function(req,res){
  var query ={_id:req.params.id}
  db.collection('restuarant').find(query).toArray(function(err,result){
    res.send(result)
  })
})

app.get('/restuarantlist/:mealtype',function(req,res){
  var condition ={};
  if(req.query.cuisine){
   condition = {"type.mealtype":req.params.mealtype,"Cuisine.cuisine":req.query.cuisine}
  }else if(req.query.city){
    condition = {"type.mealtype":req.params._id,"Cuisine.cuisine":req.query.cuisine}
  }
  else{
    query={"type.mealtype":req.params.mealtype}
  }
  db.collection('restuarant').find(condition).toArray(function(err,result){
    if (err) throw err;
    res.send(result)
})
})




      app.get('/cuisine',function(req,res){
        db.collection('cuisine').find().toArray(function(err,result){
            if (err) throw err;
            res.send(result)
        })
      })
    
    
    
    app.get('/order',function(req,res){
        db.collection('order').find().toArray(function(err,result){
            if (err) throw err;
            res.send(result)
        })
      })
    
    

    
MongoClient.connect(mongourl,function(err,connection){
    if(err) throw err;
    db = connection.db('assign6');
    app.listen(7600,function(err){
        if (err) throw err;
        console.log('server is running on port  7600')
    })
})
