var PostService = require('../services/post.service')    
var ObjectId = require('mongodb').ObjectID;

exports.getAllPost = async function (req, res, next) {
    try {
        var post = await PostService.getAllPost({})
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getAllUserPost = async function (req, res, next) {
    var authorId = req.params.id;
    try {
        var post = await PostService.getAllUserPost({"authorId": authorId})
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createPost = async function (req, res, next) {
    var posts = req.body;
    
    try {
        var post = await PostService.createPost(posts)
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deletePost = async function (req, res, next) {
    var id = req.body.id;
    try {
        var post = await PostService.deletePost({"_id": new ObjectId(id)})
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updatePost = async function (req, res, next) {
    var id = req.body["_id"];
    var newPost = req.body;
    try {
        var post = await PostService.updatePost({"_id": new ObjectId(id)}, newPost)
        return res.status(200).json({ status: 200, data: post, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

