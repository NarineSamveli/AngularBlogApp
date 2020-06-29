const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/blogDb";
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
	if(err) return console.log(err);
	db = db.db("blogDb");
	userCollection = db.collection('user', function(err, collection) {});
	postCollection = db.collection('post', function(err, collection) {});
	commentCollection = db.collection('comment', function(err, collection) {});
});

exports.getAllPost = async function (query) {
    try {
        var posts = await postCollection.find(query).sort({ date: -1, likes: -1}).toArray();
        return posts;
    } catch (e) {
        throw Error('Error')
    }
}

exports.getAllUserPost = async function (query) {
    try {
        var posts = await postCollection.find(query).sort({ date: -1, likes: -1}).toArray();
        return posts;
    } catch (e) {
        throw Error('Error')
    }
}

exports.createPost = async function (post) {
    try {
        
        var posts = await postCollection.insertOne(post);
        return posts;
    } catch (e) {
        throw Error('Error')
    }
}

exports.deletePost = async function (query, commQuery) {
    try {
        var posts = await postCollection.deleteOne(query);
        commentCollection.deleteMany(commQuery);
        return posts;
    } catch (e) {
        throw Error('Error')
    }
}

exports.updatePost = async function (query, newPost) {
    try {
        postCollection.findOneAndUpdate(query,
        { $set: {
            "title": newPost.title,
            "description": newPost.description,
            "image": newPost.image,
            "whoLiked": newPost.whoLiked,
            "likes": newPost.likes
            },
        }, function(err, res){
            if (err) throw err;
        });
        var posts = await postCollection.findOne(query);
        return posts;
    } catch (e) {
        throw Error('Error')
    }
}

