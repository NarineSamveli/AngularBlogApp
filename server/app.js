const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/blogDb';

const User = require('./model/user');
const Post = require('./model/post');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

 // Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Server start work...");
    });
});

app.post('/api/user/login', (req, res) => {
	User.find({
		username : req.body.username, password : req.body.password
	}, function(err, user){
			if(err) throw err;
			if(user.length === 1){	
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

app.get("/api/user/:id", function(req, res){
	const id = req.params.id;
	if ((id == 'all') || (id == 'admin')) {
		User.find({}, function(err, users){
			if(err) return console.log(err);
			res.send(users);
			res.end();
		});
	} else {
		User.findOne({_id: [id]}, function(err, user){
			if(err) return console.log(err);
			res.send(user);
			res.end();
		});
	}	
  });

app.post('/api/user/create', (req, res) => {
		const user = new User({
			name: req.body.name,
			username: req.body.username,
			password: req.body.password
		})
		user.save((err, res) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
});

app.post('/api/post/createPost', (req, res) => {
		const post = new Post({
			title: req.body.title,
			description: req.body.description
		})
		post.save((err, doc) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: doc
			})
		})
});

app.post('/api/post/getPost', (req, res) => {
		const post = new Post({
			title: req.body.title,
			description: req.body.description
		})
		post.save((err, res) => {
			if(err) throw err;
			return res.status(200).json({
				status: 'success',
				data: res
			})
		})
});

app.post('/api/post/getAllPost', (req, res) => {
	Post.find({},[],{ sort: { _id: -1 } },(err, doc) => {
		if(err) throw err;
		return res.status(200).json({
			status: 'success',
			data: doc
		})
	})
});

app.post('/api/post/updatePost', (req, res) => {
	Post.update(
		{_id: req.body.id },
		{ title : req.body.title, description: req.body.description },
		(err, doc) => {
		if(err) throw err;
		return res.status(200).json({
		status: 'success',
		data: doc
		})
	})
});

app.post('/api/post/deletePost', (req, res) => {
	Post.findByIdAndRemove(req.body.id, (err, doc) => {
		if(err) throw err;
		return res.status(200).json({
			status: 'success',
			data: doc
		})
	})
});