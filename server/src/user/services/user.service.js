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

exports.getUser = async function (query, id) {
    if ((id == 'all') || (id == 'admin')) {
        try {
            var users = await userCollection.find(query).toArray();
            return users;
        } catch (e) {
            // Log Errors
            throw Error('Error while Paginating Users')
        }
    } else {   
        try {
            var users = await userCollection.find({"_id": new ObjectId(id)}).toArray();
            return users[0];
        } catch (e) {
            // Log Errors
            throw Error('Error while Paginating Users')
        }
    }
}

exports.updateUser = async function (query, newUser) {
    try {
        userCollection.findOneAndUpdate(query, 
        { $set: {
            "fullName": newUser.fullName,
            "login": newUser.login,
            "password": newUser.password,
            "confirmPassword": newUser.confirmPassword,
            "dateOfBirth": newUser.dateOfBirth,
            "aboutYou": newUser.aboutYou,
            "filename": newUser.filename,
            "isDeleted": newUser.isDeleted },
        }, function(err, res){
            if (err) throw err;
        });
      
        var user = await userCollection.findOne(query);
        return user;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
