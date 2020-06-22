var PostService = require('../services/post.service')    
var ObjectId = require('mongodb').ObjectID;

exports.getAllPost = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        var post = PostService.getAllPost({})
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllUserPost = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var authorId = req.params.id;
    try {
        var post = PostService.getAllUserPost({"authorId": authorId})
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createPost = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var posts = req.body;
    try {
        var post = PostService.createPost(posts)
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deletePost = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body.id;
    try {
        var post = PostService.deletePost({"_id": new ObjectId(id)})
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updatePost = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body["_id"];
    var newPost = req.body;
    try {
        var post = PostService.updatePost({"_id": new ObjectId(id)}, newPost)
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

