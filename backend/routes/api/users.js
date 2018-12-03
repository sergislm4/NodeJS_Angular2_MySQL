var router = require('express').Router();
var sql = require('../../models/user');
var bcrypt = require('bcrypt-nodejs');
var multer = require('multer');
var passport = require('passport');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/avatars/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('photo');

router.post('/login', function(req, res, next){
    passport.authenticate('local-login', function (err, user, info){
        if(err){
            return res.send(err);
        }
        if (!user) {
            return res.send('error credentials');
        }
        req.logIn(user, function(err) {
            if (err) {
              return next(err);
            }
            return res.send(user);
        });
    })(req, res, next);
});

router.post('/register', function(req, res, next){
    passport.authenticate('local-signup', function (err, user, info){
        if (err) {
            return res.send(err);
        }else if (!user) {
            return res.send('Mail already exists');
        }
        console.log(user);
        return res.send(user);
    })(req, res, next);
});

router.post('/setAvatar', function(req, res, next){
    upload(req, res, function(err){
        if(err){
            return res.send('Something went wrong, try it again in a few minutes!');
        }    

        sql.setAvatar('http://127.0.0.1:8081/'+req.file.path, req.headers.email, function (rows) {  
            if (rows.affectedRows == 1) {
                return res.send('Uploaded successfully!');
            }else{
                return res.send('Something went wrong, try it again in a few minutes!');
            }
        });
    });
});

router.get('/user', function(req, res, next){
    sql.getUserLogged(auth.getTokenFromHeader(req), function (err, rows) {
        if (!rows.length) {
            return res.send(err);
        }else {
            console.log(rows[0]);
            return res.send({user: rows[0]});
        }
    });
});

router.put('/user', function(req, res, next){
    sql.getUserLogged(auth.getTokenFromHeader(req), function (err, rows) {
        if (!rows.length) {
            return res.send(err);
        }else {
            // only update fields that were actually passed...
            if(typeof req.body.user.first_name !== 'undefined'){
                rows[0].first_name = req.body.user.first_name;
            }
            if(typeof req.body.user.last_name !== 'undefined'){
                rows[0].last_name = req.body.user.last_name;
            }
            if(typeof req.body.user.email !== 'undefined'){
                rows[0].user_id = sql.generateJWT(req.body.user.email)
            }
            if(typeof req.body.user.password !== 'undefined'){
                if (!bcrypt.compareSync(req.body.user.password, rows[0].password)) {
                    rows[0].password = bcrypt.hashSync(req.body.user.password, null, null);
                }
            }
            if(typeof req.body.user.phone !== 'undefined'){
                rows[0].phone = req.body.user.phone;
            }
            if(typeof req.body.user.website !== 'undefined'){
                rows[0].website = req.body.user.website;
            }
            if(typeof req.body.user.currency !== 'undefined'){
                rows[0].currency = req.body.user.currency;
            }
            if(typeof req.body.user.city !== 'undefined'){
                rows[0].city = req.body.user.city;
            }
            if(typeof req.body.user.avatar !== 'undefined'){
                rows[0].avatar = req.body.user.avatar;
            }
            if(typeof req.body.user.avatar !== 'undefined'){
                rows[0].avatar = req.body.user.avatar;
            }
            let user = rows[0];
            sql.updateUser(rows[0], function (rows) {  
                if (rows.affectedRows == 1) {
                    return res.send(user);
                }else{
                    return res.send('Something went wrong, try it again in a few minutes!');
                }
            });
        }
    });
});

module.exports = router;