/**
 * Created by darthrahj on 11/28/17.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://r39rivera:Holleriv12@ds251245.mlab.com:51245/heroku_1jbzqctc";

module.exports.storeData =  function (request, response) {

    //Create IDs for documents
    var customerID = Math.floor((Math.random() * 1000000000000) + 1);
    var billingID = Math.floor((Math.random() * 1000000000000) + 1);
    var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var CUSTOMERS = db.collection('CUSTOMERS');
        var BILLING = db.collection('BILLING');
        var SHIPPING = db.collection('SHIPPING');
        var ORDERS = db.collection('ORDERS');

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

        var billingdata = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDTYPE: request.param('creditType'),
            CREDITCARDNUM: request.param('cardNumber'),
            CREDITCARDEXP: request.param('expiratoin'),
            CREDITCARDSECURITYNUM: request.param('ccv')
        }

        var shippingdata = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: request.param('inputAddress') + ' ' + request.param('inputAddress2'),
            SHIPPING_CITY: request.param('inputCity'),
            SHIPPING_STATE: request.param('inputState'),
            SHIPPING_ZIP: request.param('inputZip')
        }

        //Create a date
        var now = new Date();
        //Jsonify
        var jsonDate = now.toJSON();

        //My Count of unique items(not including multiples)
        var count = request.param('aggCount');

        //Empty array to push objects into
        var productVector = [];

        //Unwrapping my cart items
        for(var i = 0 ; i < count; i++){
            var item = {}; //empty object
            item['prodName' + i] = request.param('prodName' + i);  //create key-val pair from parameters
            item['prodCost' + i] = request.param('prodCost' + i);
            item['prodQuant' + i] = request.param('prodQuant' + i);
            productVector.push(item); //push document into array
        }

        var orderdata = {
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: jsonDate,
            PRODUCT_VECTOR: productVector,
            ORDER_TOTAL: request.param('total')
        };

        //Insert into customers collection
        CUSTOMERS.insertOne(customerdata, function (err, result) {
            if (err) {
                response.render('storeData', { status1: 'Order NOT Successful'});
                throw err;
            }
        });

        //Insert into billing collection
        BILLING.insertOne(billingdata, function (err, result) {
            if (err) {
                response.render('storeData', { status1: 'Order NOT Successful'});
                throw err;
            }
        });

        //Insert into shipping collection
        SHIPPING.insertOne(shippingdata, function (err, result) {
            if (err) {
                response.render('storeData', { status1: 'Order NOT Successful'});
                throw err;
            }
        });

        //Insert into order collection
        ORDERS.insertOne(orderdata,function (err, result) {
            if (err) {
                response.render('storeData', { status1: 'Order NOT Successful'});
                throw err;
            }
        });
        response.render('storeData', { status1: 'Order Successful'});

        db.close(function  (err) {
            if(err)  throw err;
        });
    });
};