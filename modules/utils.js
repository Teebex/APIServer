// IPX specific functions

var logger = require("./logger");

var unquotestr = function(str) {
    const quoteChar = '"';
    if (str[0] === quoteChar && str[str.length - 1] === quoteChar)
        return str.slice(1, str.length - 1);
    else return str;
};

//export function IPXstrDateDecode(strdate) {
var IPXstrDateDecode = function(strdate) {
    strdate = unquotestr(strdate);
    var ts = new Date(strdate);
    if (isNaN(ts)) {
        // Default value
        ts = new Date();
        // IPX timestamp ? JJ/MM/AA-HH:MM:SS
        var datetimeparts = strdate.split("-");
        if (datetimeparts.length == 2) {
            var dateparts = datetimeparts[0].split("/");
            var timeparts = datetimeparts[1].split(":");
            if ((dateparts.length == 3) && (timeparts.length == 3)) {
                var tsyear = 2000 + eval(dateparts[2]);
                var tsmonth = eval(dateparts[1]);
                var tsday = eval(dateparts[0]);
                var tshour = eval(timeparts[0]);
                var tsminute = eval(timeparts[1]);
                var tsseconde = eval(timeparts[2]);
                logger.debug(strdate, " splitted into :", tsyear, "/", tsmonth, "/", tsday, " ", tshour, ":", tsminute, ":", tsseconde)
                ts = new Date(tsyear, tsmonth - 1, tsday, tshour + 1, tsminute, tsseconde);
            }
        }
    }
    return ts;
}

var is_int = function(value) {
    if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
        return true;
    } else {
        return false;
    }
}

module.exports = { IPXstrDateDecode, is_int, unquotestr };