var AuthorizationController = require('../controllers/authorization.controller')

module.exports = function (app, db) {
    app.post('/api/authorization/signup', function(req,res){
        db.collection('user').findOne({'login': req.body.login}, function(err,docs){
            if (docs === null){
                req.body.role = 'user';
                req.body.isDeleted = false;
                db.collection('user').insertOne(req.body, function(err, res) {
                    if (err) throw err;
                    // console.log("1 document inserted");
                }); 
                res.send(true);
            }else{
                res.send(false);
            }
        });    
    })

    app.post('/api/authorization/login',  (req, res) => {	
        db.collection('user').findOne({'login': req.body.login, 'password': req.body.password, 'isDeleted': false}, 
        function(err, user){
                if(err) throw err;
                if(user !== null){	
                    return res.status(200).json({
                        status: 'success',
                        data: user
                    })
                } else {
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Login Failed'
                    })
                }			
        })
    })
}
