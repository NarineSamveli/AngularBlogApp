var CommentService = require('../services/comment.service')    
var ObjectId = require('mongodb').ObjectID;

exports.getAllComments = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        var comment = CommentService.getAllComments({})
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addComment = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var comments = req.body;
    try {
        var comment = CommentService.addComment(comments)
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteComment = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body.id;
    try {
        var comment = CommentService.deleteComment({"_id": new ObjectId(id)})
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateComment = function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body.id;
    try {
        var comment = CommentService.updateComment({"_id": new ObjectId(id)}, req.body)
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
