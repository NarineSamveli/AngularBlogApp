var AuthorizationService = require('../services/authorization.service')    

exports.getSignup = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var login = req.body.login;
    try {
        var user = AuthorizationService.getSignup({'login': login}, req.body)
        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateLogin = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var login = req.body.login;
    var password = req.body.password;
    try {
        var user = AuthorizationService.updateLogin({'login': login, 'password': password, 'isDeleted': false}, req.body)
        
        return res.status(200).json({ status: 200, data: user, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
