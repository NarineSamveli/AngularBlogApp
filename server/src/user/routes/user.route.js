var UserController = require('../controllers/user.controller');

module.exports = function (app, db) {
    app.get('/api/user/:id', UserController.getUser);

    app.put('/api/user/update/', UserController.updateUser);

}
