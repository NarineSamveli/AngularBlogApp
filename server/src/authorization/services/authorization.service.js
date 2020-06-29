const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://localhost:27017/blogDb";

MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db){
	if(err) return console.log(err);
	db = db.db("blogDb");
	userCollection = db.collection('user', function(err, collection) {});
	postCollection = db.collection('post', function(err, collection) {});
	commentCollection = db.collection('comment', function(err, collection) {});
});

exports.getSignup = async function (query, user) {
    try {
        var users = await userCollection.findOne(query, function(err,docs){
            if (docs === null){
                user.role = 'user';
                user.isDeleted = false;
                userCollection.insertOne(user, function(err, res) {
                    if (err) throw err;
                    // console.log("1 document inserted");
                }); 
            }});
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

exports.updateLogin = async function (query, user) {
    try {
        var users = await userCollection.findOne(query);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
