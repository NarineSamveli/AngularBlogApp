var UserService = require('../services/user.service')    
var ObjectId = require('mongodb').ObjectID;

exports.getUser = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.params.id;
    try {
        var user = UserService.getUser({}, id)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
    
exports.updateUser = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body["_id"];
    try {
        var user = UserService.updateUser({"_id": new ObjectId(id)}, req.body)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
