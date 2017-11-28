var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/herokuConnect', function(req, res, next) {
   res.render('index', { title: 'Express'});
});


router.get('/mLabConnect', function(req, res, next) {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://r39rivera:Holleriv12@ds251245.mlab.com:51245/heroku_1jbzqctc";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("ORDERS").find({name: "Renato"}).toArray(function (err, docs) {
            if (err) throw err;
            docs.forEach(function (doc) {
                res.send(doc['name'] + " " + doc['order']);
            });
        });
    });
});

router.post('/', function(req, res){
    //res.render('index', { title: 'Express'});
    var count = req.param('aggCount');
    var string = "";
    for( var i = 0; i < count; i++)
        string += req.param('prodName' + count);
    res.send("Hey! " + string);
});

/*
router.post('/', function(req, res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://r39rivera:Holleriv12@ds251245.mlab.com:51245/heroku_1jbzqctc";


    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.collection("ORDERS").find({name: req.param('username')}).toArray(function (err, docs) {
            if (err) throw err;
            docs.forEach(function (doc) {
                res.send(doc['name'] + " " + doc['order']);
            });
        });
    });
});*/

module.exports = router;