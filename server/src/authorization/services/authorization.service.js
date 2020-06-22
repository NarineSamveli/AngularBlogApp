var User = require('../../user/models/user.model')

exports.getSignup = async function (query, id) {
    try {
        //var users = await User.find(query)
        var users = userCollection.findOne(query, function(err,docs){
            if (docs === null){
                req.body.role = 'user';
                req.body.isDeleted = false;
                userCollection.insertOne(req.body, function(err, res) {
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

exports.updateLogin = async function (query, id) {
    try {
        //var users = await User.find(query)
        console.log(userCollection)
        var users = await userCollection.findOne(query);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}
