const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var userCollection, postCollection, commentCollection, db;

const authorizationRoute = require('./authorization/routes/authorization.route');
const commentRoute = require('./comment/routes/comment.route');
const userRoute = require('./user/routes/user.route');
const postRoute = require('./post/routes/post.route');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

// app.use('/api/user', require('./user/routes/user.route'));
// app.use('/api/post', require('./post/routes/post.route'));

 // Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const port = 3000;
const URL = "mongodb://localhost:27017/blogDb";

MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
	if(err) return console.log(err);
	db = db.db("blogDb");
	userCollection = db.collection('user', function(err, collection) {});
	postCollection = db.collection('post', function(err, collection) {});
	commentCollection = db.collection('comment', function(err, collection) {});
	userCollection.findOne({'login': 'admin'}, function(err,docs){
        if (docs === null){
            userCollection.insertOne({
				login: 'admin',
				password: 'admin',
				fullName: 'Mr. Admin',
				email: 'admin@admin.com',
				confirmPassword: 'admin',
				filename: '',
				dateOfBirth: '01.01.1994',
				aboutYou: 'Admin',
				role: 'admin',
				isDeleted: false
			});
        }
	});

	authorizationRoute(app, db);
	userRoute(app, db);
	postRoute(app, db);
	commentRoute(app, db);

	app.listen(port, () => {
		console.log("Server start work on " + port);
	})
});

