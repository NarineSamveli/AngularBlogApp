var UserController = require('../controllers/user.controller');
var ObjectId = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/api/user/:id', function(req, res){
        const id = req.params.id;
          //console.log(id)
        if ((id == 'all') || (id == 'admin')) {
            db.collection('user').find().toArray( function(err, users){
                if(err) return console.log(err);
                  res.send(users);
                  res.end();
            });
        } else {
            db.collection('user').find({"_id": new ObjectId(id)}).toArray( function(err, user){
                if(err) return console.log(err);		
                  res.send(user[0]);
                  res.end();
            });
        }	
    })

    app.put('/api/user/update/', function(req, result){ 
        db.collection('user').findOneAndUpdate({"_id": new ObjectId(req.body["_id"])}, 
          { $set: {
              "fullName": req.body.fullName,
              "login": req.body.login,
              "password": req.body.password,
              "confirmPassword": req.body.confirmPassword,
              "dateOfBirth": req.body.dateOfBirth,
              "aboutYou": req.body.aboutYou,
              "filename": req.body.filename,
              "isDeleted": req.body.isDeleted },
          }, function(err, res){
              if (err) throw err;
              if(!err){
                db.collection('user').findOne({"_id": new ObjectId(req.body["_id"])}, 
                  function(err, user){
                      if(err) throw err;
                      return result.send(user);	
                })
            }
        });
    })
}
