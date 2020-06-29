var PostController = require('../controllers/post.controller')
var ObjectId = require('mongodb').ObjectID;

module.exports = function (app, db) {
    
    app.get('/api/post/getAllPost', PostController.getAllPost);

    app.get('/api/post/getAllUserPost/:id', PostController.getAllUserPost);
    
    app.post('/api/post/createPost', PostController.createPost);
    
    app.delete('/api/post/deletePost', PostController.deletePost);
    
    app.put('/api/post/updatePost', PostController.updatePost);
}
