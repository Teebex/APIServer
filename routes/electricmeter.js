// needed packages
var express = require('express');

var logger = require('../modules/logger');
var DB = require('../models/dbelectricmeter');
var utils = require('../modules/utils');


var router = express.Router();

// general
router.use(function logquery(req, res, next) {
    //console.log("query ->baseUrl:", req.baseUrl, " body:", req.body, " path:", req.path, " query:", req.query);
    //logger.debug("URL", req.originalUrl);
    //logger.debug("content-type:", req.get('Content-Type'));
    logger.debug("body: ", req.body);
    logger.debug("query:", req.query);
    next();
})


// Create new record electricmeter cumulativevalue
router.post('/', function(req, res) {
    logger.debug("post", req.originalUrl);
    // Params are passed throught query (Postman) or body (IPX)
    var ID = req.query.ID || req.body.ID;
    var timestamp = req.query.timestamp || req.body.timestamp;
    var cumulativevalue = req.query.cumulativevalue || req.body.cumulativevalue;

    logger.debug("initial ID:", ID, " timestamp:", timestamp, " cumulativevalue:", cumulativevalue);

    // ID Check 
    if (utils.is_int(ID) == false) {
        res.json({ status: 400, message: "invalid ID" });
        logger.error("ID :", ID, " is not an integer");
        return;
    }

    // cumulativevalue Check
    if (!(utils.is_int(cumulativevalue))) {
        res.json({ status: 400, message: "invalid cumulativevalue" });
        logger.error("cumulativevalue :", cumulativevalue, " is not an integer");
        return;
    }

    // Http request update Callback 
    function DBError(err) {
        if (err) {
            logger.debug('500:internal error');
            res.json({ status: 500, message: 'internal error' });
        } else {
            logger.debug("200:electricmeter log created");
            res.json({ status: 200, message: "electricmeter log created" });
        };
    }

    // Database storing ...
    // logger.debug('Database storing ...');
    DB.electricmeter.create(DBError, ID, cumulativevalue, utils.IPXstrDateDecode(timestamp));
})


router.get('/', function(req, res) {
    var ID = req.query.ID || req.body.ID;

    // ID Check
    if (ID) {
        if (utils.is_int(ID) == false) {
            res.json({ status: 400, message: "invalid ID" });
            logger.error("ID :", ID, " is not an integer");
            return;
        }
    }

    logger.debug('get', ID);
    DB.electricmeter.fetchAll(function(err, result) {
        if (err) {
            logger.debug('500:internal error');
            res.json({ status: 500, message: 'internal error' });
        } else {
            res.json({ status: 200, message: result });
        }
    }, ID);
})


module.exports = router;