var CommentController = require('../controllers/comment.controller');
var ObjectId = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/api/comment/getAllComments/:id',function(req,res){
        db.collection('comment').find({postId: req.params.id}).toArray(function(err, result) {
            //console.log(result);
            if (!err){
                res.send({
                    data:result,
                    success: true
                })
            }else{
                res.send({
                    success: false
                })
            }
          });
    })// CommentController.getAllComments)

    app.post('/api/comment/addComment',function(req,res){ 
        db.collection('comment').insertOne(req.body, function(err, result) {
            if (!err){
                res.send({
                    data:result,
                    success:true
                })
            }else{
                res.send({
                    success:false
                })
            }
        });
    })

    app.delete('/api/comment/deleteComment',function(req,res){
        db.collection('comment').deleteOne({"_id": new ObjectId(req.body.id)},function(err,result){
            if(!err){
                res.send({
                    delete:true
                })
            }
            else{
                res.send({
                    delete:false
                })
            }
        })
    })

    app.put('/api/comment/updateComment',function(req, result){ 
        db.collection('comment').findOneAndUpdate({"_id": new ObjectId(req.body["_id"])}, 
          { $set: {
              "description": req.body.description,
              "whoLiked": req.body.whoLiked,
              "likes": req.body.likes
              },
          }, function(err, res){
              if (err) throw err;
              if(!err){
                db.collection('comment').findOne({"_id": new ObjectId(req.body["_id"])}, 
                  function(err, post){
                      if(err) throw err;
                      return result.send(post);	
                  })
              }
          });
      });
}
