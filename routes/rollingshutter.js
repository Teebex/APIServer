// needed packages
var express = require('express');

var logger = require('../modules/logger');
var DB = require('../models/dbrollingshutter');
var utils = require('../modules/utils');


var router = express.Router();

/*tips 
CRUD :
MÉTHODE HTTP	ÉTAPE CRUD
POST	        Create
GET	            Read
PUT	            Update
DELETE	        Delete


Utiliser les bons codes de statut HTTP

Avant de sauter dans le code, un petit rappel des codes de statut HTTP qui nous intéresseront:

CODE	MESSAGE	DESCRIPTION
200	OK	Le code de statut par défaut en cas de succès. Il sera en général accompagné d’un corps de réponse en JSON
400	Bad Request	Le code d’erreur générique dans le cas d’informations invalides fournis au service dans la requête (format de données invalide par exemple
404	Not Found	Code d’erreur typiquement retourné dans le cas d’une URI d’entité (en PUT ou GET) qui n’existe pas
405	Method Not Allowed	Retourné lorsque l’utilisateur effectue un appel à une URL ne supportant pas la méthode demandée
406	Not Acceptable	Ce code sera retourné lorsque la requête contient des entêtes qui nous semblent incompatibles avec le fonctionnement du service, par exemple si dans l’entête « Accept » on ne trouve pas « application/json », ça signifie que la requête déclare explicitement ne pas accepter ce format, et on n’est donc pas en mesure de communiquer avec ce client
500	Server Error	Ce sera le code d’erreur par défaut, celui qu’on ne souhaite jamais retourner car il s’agit d’une erreur « non traitée »
*/

// general
router.use(function logquery(req, res, next) {
    //console.log("query ->baseUrl:", req.baseUrl, " body:", req.body, " path:", req.path, " query:", req.query);
    logger.debug("URL", req.originalUrl);
    logger.debug("content-type:", req.get('Content-Type'));
    logger.debug("body: ", req.body);
    logger.debug("query:", req.query);
    next();
})



// Create new record Shutter status
router.post('/', function(req, res) {
    logger.debug("post");
    // Params are passed throught query (Postman) or body (IPX)
    var ID = req.query.ID || req.body.ID;
    var timestamp = req.query.timestamp || req.body.timestamp;
    var position = req.query.position || req.body.position;

    logger.debug("initial ID:", ID, " timestamp:", timestamp, " position:", position);

    // ID Check 
    if (utils.is_int(ID) == false) {
        res.json({ status: 400, message: "invalid ID" });
        logger.error("ID :", ID, " is not an integer");
        return;
    }

    // position Check
    if (!(utils.is_int(position))) {
        res.json({ status: 400, message: "invalid position" });
        logger.error("position :", position, " is not an integer");
        return;
    }



    // Http request update Callback 
    function DBError(err) {
        if (err) {
            logger.debug('500:internal error');
            res.json({ status: 500, message: 'internal error' });
        } else {
            logger.debug("200:shutter log created");
            res.json({ status: 200, message: "shutter log created" });
        };
    }

    // Database storing ...
    logger.debug('Database storing ...');
    DB.rollingshutter.create(DBError, ID, position, utils.IPXstrDateDecode(timestamp));
})

router.get('/', function(req, res) {
    var ID = req.query.ID || req.body.ID;
    logger.debug('get', ID);
    DB.rollingshutter.fetchAll(function(err, result) {
        if (err) {
            logger.debug('500:internal error');
            res.json({ status: 500, message: 'internal error' });
        } else {
            res.json({ status: 200, message: result });
        }
    }, ID);
})

module.exports = router;