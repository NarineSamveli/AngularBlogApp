var AuthorizationController = require('../controllers/authorization.controller')

module.exports = function (app, db) {
    app.post('/api/authorization/signup', AuthorizationController.getSignup);

    app.post('/api/authorization/login', AuthorizationController.updateLogin);
}
