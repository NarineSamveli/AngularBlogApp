const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/blogDb";

MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
	if(err) return console.log(err);
	db = db.db("blogDb");
	userCollection = db.collection('user', function(err, collection) {});
	postCollection = db.collection('post', function(err, collection) {});
	commentCollection = db.collection('comment', function(err, collection) {});
});

exports.getAllComments = async function (query) {
    try {
        var comments = await commentCollection.find(query).toArray();
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.addComment = async function (comment) {
    try {
        var comments = await commentCollection.insertOne(comment);
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.deleteComment = async function (query) {
    try {
        //var users = await User.find(query)
        var comments = await commentCollection.deleteOne(query);
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.updateComment = async function (query, comment) {
    try {
        commentCollection.findOneAndUpdate(query,
            { $set: {
                "description": comment.description,
                "whoLiked": comment.whoLiked,
                "likes": comment.likes
                },
            }, function(err, res){
                if (err) throw err;
        });
        var comments = await commentCollection.findOne(query);
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}
