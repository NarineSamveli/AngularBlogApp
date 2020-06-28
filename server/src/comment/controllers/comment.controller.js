var CommentService = require('../services/comment.service')    
var ObjectId = require('mongodb').ObjectID;

exports.getAllComments = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    try {
        var comment = await CommentService.getAllComments( {'postId': String(req.params.id) } );
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addComment = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var comments = req.body;
    try {
        var comment = await CommentService.addComment(comments)
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteComment = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body.id;
    try {
        var comment = await CommentService.deleteComment({"_id": new ObjectId(id)}, {'postId': String(id) })
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateComment = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var id = req.body['_id'];
    try {
        var comment = await CommentService.updateComment({"_id": new ObjectId(id)}, req.body)
        return res.status(200).json({ status: 200, data: comment, message: "Succesfully" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
