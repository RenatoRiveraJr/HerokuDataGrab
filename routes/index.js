var express = require('express');
var router = express.Router();
var ControllerDatabase = require('../controllers/database');
/* GET home page. */

router.post('/storeData', ControllerDatabase.storeData);


module.exports = router;