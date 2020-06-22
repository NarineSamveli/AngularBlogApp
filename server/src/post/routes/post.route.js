var PostController = require('../controllers/post.controller')
var ObjectId = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/api/post/getAllPost', (req, res) => {
        db.collection('post').find().sort( { date: -1, likes: -1  }).toArray((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    })

    app.get('/api/post/getAllUserPost/:id', (req, res) => {
        db.collection('post').find({"authorId": req.params.id}).sort( { date: -1, likes: -1  }).toArray((err, doc) => {
            if(err) throw err;
            return res.status(200).json({
                status: 'success',
                data: doc
            })
        })
    })
    
    app.post('/api/post/createPost', (req, res) => {
        db.collection('post').insertOne(req.body, function(err, res) {
            if (err) throw err;
            // console.log("1 document inserted");
        }); 
        res.send(true);
    })
    
    app.delete('/api/post/deletePost', (req, res) => {
        // console.log(req.body.id)
        db.collection('post').deleteOne({"_id": new ObjectId(req.body.id)}, function(err, res) {
            if (err) throw err;
            // console.log(res);
        }); 
        res.send();
    })
    
    app.put('/api/post/updatePost', function(req, result){ 
        db.collection('post').findOneAndUpdate({"_id": new ObjectId(req.body["_id"])}, 
          { $set: {
              "title": req.body.title,
              "description": req.body.description,
              "image": req.body.image,
              "whoLiked": req.body.whoLiked,
              "likes": req.body.likes
              },
          }, function(err, res){
              if (err) throw err;
              if(!err){
                db.collection('post').findOne({"_id": new ObjectId(req.body["_id"])}, 
                  function(err, post){
                      if(err) throw err;
                      return result.send(post);	
                  })
              }
          });
      })
}
