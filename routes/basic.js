// needed packages
var express = require('express');

var router = express.Router();

var logger = require('../modules/logger');

// 

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    logger.debug('req.path:', req.path, " req.body:", req.query.params, "req.query", req.query)
    for (var param in req.params) {
        logger.debug(param, req.params[param]);
    };
    next();
})

// simple response
router.get('/', function(req, res) {
    res.json({ message: 'ma première réponse à' + req.query.message });
})

module.exports = router;