/**
 * Created by darthrahj on 11/28/17.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://r39rivera:Holleriv12@ds251245.mlab.com:51245/heroku_1jbzqctc";

module.exports.storeData =  function (request, response) {

    var CUSTOMERS = db.collection('CUSTOMERS');
    var customerID = Math.floor((Math.random() * 1000000000000) + 1);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var customerdata = {
            _id: customerID,
            FIRSTNAME: request.param('inputFirstName'),
            LASTNAME: request.param('inputLastName'),
            STREET: request.param('inputAddress') + ' ' + request.param('inputAddress2'),
            CITY: request.param('inputCity'),
            STATE: request.param('inputState'),
            ZIP: request.param('inputZip'),
            EMAIL: request.param('inputEmail4')
        };

        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });

        /*db.collection('ORDERS').find().toArray(function(err, docs) {
            response.render('storeData', {results: docs});
        });*/
    });
};