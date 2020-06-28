var UserService = require('../services/user.service')    
var ObjectId = require('mongodb').ObjectID;

exports.getUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.params.id;
    try {
        var user = await UserService.getUser({}, id)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
    
exports.updateUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body["_id"];
    var newUser = req.body;
    try {
        var user = await UserService.updateUser({"_id": new ObjectId(id)}, newUser)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
