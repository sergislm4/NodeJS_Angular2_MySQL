var router = require('express').Router();
var sql = require('../../models/user');


router.get('/', function(req, res, next){
    sql.getUserLogged(auth.getTokenFromHeader(req), function (err, rows) {
        if (!rows.length) {
            res.send(err);
        }else {
            console.log(rows[0]);
            res.send({profile: rows[0]});
        }
    });
});

module.exports = router;