var CommentController = require('../controllers/comment.controller');
var ObjectId = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/api/comment/getAllComments/:id', CommentController.getAllComments);

    app.post('/api/comment/addComment', CommentController.addComment);

    app.delete('/api/comment/deleteComment', CommentController.deleteComment);

    app.put('/api/comment/updateComment', CommentController.updateComment);

}
