// needed packages
var express = require('express');

var router = express.Router();

// 

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now(), 'req.path:', req.path, " req.body:", req.query.params, "req.query", req.query)
    for (var param in req.params) {
        console.log(param, reg.params[param]);
    };
    next();
})

// simple response
router.get('/', function(req, res) {
    res.json({ message: 'ma première réponse à' + req.query.message });
})

module.exports = router;