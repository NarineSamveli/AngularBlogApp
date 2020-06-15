const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const url = 'mongodb://localhost:27017/blogDb';
const User = require('./model/user');
const Post = require('./model/post');
const Comment = require('./model/comment');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var userCollection, postCollection, commentCollection, db;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

 // Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
	if(err) return console.log(err);
	db = db.db("blogDb");
	userCollection = db.collection('user', function(err, collection) {});
	postCollection = db.collection('post', function(err, collection) {});
	commentCollection = db.collection('comment', function(err, collection) {});
    app.listen(3000, function(){
        console.log("Server start work...");
    });
});

//------------User-----------------------------------------------------------

app.post('/api/user/signup', function(req,res){
	userCollection.findOne({'login': req.body.login}, function(err,docs){
        if (docs === null){
            userCollection.insertOne(req.body, function(err, res) {
                if (err) throw err;
                // console.log("1 document inserted");
            }); 
            res.send(true);
        }else{
            res.send(false);
        }
    });    
});

app.post('/api/user/login', (req, res) => {	
	userCollection.findOne({'login': req.body.login, 'password': req.body.password}, 
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
});

app.put('/api/user/update/',function(req, result){ 
	userCollection.findOneAndUpdate({"_id": new ObjectId(req.body["_id"])}, 
	  { $set: {
		  "fullName": req.body.fullName,
		  "password": req.body.password,
		  "confirmPassword": req.body.confirmPassword,
		  "dateOfBirth": req.body.dateOfBirth,
		  "aboutYou": req.body.aboutYou,
		  "filename": req.body.filename },
	  }, function(err, res){
		  if (err) throw err;
		  if(!err){
			  userCollection.findOne({"_id": new ObjectId(req.body["_id"])}, 
			  function(err, user){
				  if(err) throw err;
				  return result.send(user);	
			})
		}
	});
});
  
app.get("/api/user/:id", function(req, res){
	const id = req.params.id;
	  //console.log(id)
	if ((id == 'all') || (id == 'admin')) {
		userCollection.find().toArray( function(err, users){
			if(err) return console.log(err);
			  res.send(users);
			  res.end();
		});
	} else {
		  userCollection.find({"_id": new ObjectId(id)}).toArray( function(err, user){
			if(err) return console.log(err);		
			  res.send(user[0]);
			  res.end();
		});
	}	
});

//-----POST----------------------------------------------------------

app.get('/api/post/getAllPost', (req, res) => {
	postCollection.find().sort( { date: -1, likes: -1  }).toArray((err, doc) => {
		if(err) throw err;
		return res.status(200).json({
			status: 'success',
			data: doc
		})
	})
});

app.get('/api/post/getAllUserPost/:id', (req, res) => {
	postCollection.find({"authorId": req.params.id}).sort( { date: -1, likes: -1  }).toArray((err, doc) => {
		if(err) throw err;
		return res.status(200).json({
			status: 'success',
			data: doc
		})
	})
});

app.post('/api/post/createPost', (req, res) => {
	postCollection.insertOne(req.body, function(err, res) {
		if (err) throw err;
		// console.log("1 document inserted");
	}); 
	res.send(true);
});

app.delete('/api/post/deletePost', (req, res) => {
	// console.log(req.body.id)
	postCollection.deleteOne({"_id": new ObjectId(req.body.id)}, function(err, res) {
		if (err) throw err;
		// console.log(res);
	}); 
	res.send();
});

app.put('/api/post/updatePost',function(req, result){ 
	postCollection.findOneAndUpdate({"_id": new ObjectId(req.body["_id"])}, 
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
			postCollection.findOne({"_id": new ObjectId(req.body["_id"])}, 
			  function(err, post){
				  if(err) throw err;
				  return result.send(post);	
			  })
		  }
	  });
  });

//------------Comments------------------------------------------------------------

app.get('/api/comment/getAllComments',function(req,res){
    commentCollection.find({postId:req.body.id}).toArray(function(err, result) {
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
});

app.post('/api/comment/addComment',function(req,res){ 
	 commentCollection.insertOne(req.body, function(err, result) {
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
 });

app.delete('/api/comment/deleteComment',function(req,res){
    commentCollection.deleteOne({"_id": new ObjectId(req.body.id)},function(err,result){
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
	commentCollection.findOneAndUpdate({"_id": new ObjectId(req.body["_id"])}, 
	  { $set: {
		  "description": req.body.description,
		  "whoLiked": req.body.whoLiked,
		  "likes": req.body.likes
		  },
	  }, function(err, res){
		  if (err) throw err;
		  if(!err){
			commentCollection.findOne({"_id": new ObjectId(req.body["_id"])}, 
			  function(err, post){
				  if(err) throw err;
				  return result.send(post);	
			  })
		  }
	  });
  });


// app.post('/api/user/create', (req, res) => {
// 		const user = new User({
// 			name: req.body.name,
// 			login: req.body.login,
// 			password: req.body.password
// 		})
// 		user.save((err, res) => {
// 			if(err) throw err;
// 			return res.status(200).json({
// 				status: 'success',
// 				data: res
// 			})
// 		})
// });

// app.post('/api/post/getPost', (req, res) => {
// 		const post = new Post({
// 			title: req.body.title,
// 			description: req.body.description
// 		})
// 		post.save((err, res) => {
// 			if(err) throw err;
// 			return res.status(200).json({
// 				status: 'success',
// 				data: res
// 			})
// 		})
// });
