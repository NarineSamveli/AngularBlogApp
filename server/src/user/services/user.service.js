var User = require('../models/user.model')

exports.getUser = async function (query, id) {
    if ((id == 'all') || (id == 'admin')) {
        try {
            var users = userCollection.find(query).toArray();
            return users;
        } catch (e) {
            // Log Errors
            throw Error('Error while Paginating Users')
        }
    } else {   
        try {
            var users = userCollection.find(query).toArray();
            return users[0];
        } catch (e) {
            // Log Errors
            throw Error('Error while Paginating Users')
        }
    }
}

exports.updateUser = async function (query, user) {
    try {
        userCollection.findOneAndUpdate(query, 
        { $set: {
            "fullName": user.fullName,
            "login": user.login,
            "password": user.password,
            "confirmPassword": user.confirmPassword,
            "dateOfBirth": user.dateOfBirth,
            "aboutYou": user.aboutYou,
            "filename": user.filename,
            "isDeleted": user.isDeleted },
        }, function(err, res){
            if (err) throw err;
            if(!err){
                var newUser = userCollection.findOne(query);
                return newUser;
          }
      });
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
