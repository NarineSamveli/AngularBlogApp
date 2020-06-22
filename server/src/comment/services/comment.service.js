var Comment = require('../models/comment.model')

exports.getComments = async function (query) {
    try {
        //var users = await User.find(query)
        var comments = commentCollection.find(query).toArray();
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.addComment = async function (comment) {
    try {
        var comments = commentCollection.insertOne(comment);
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.deleteComment = async function (query) {
    try {
        //var users = await User.find(query)
        var comments = await commentCollection.deleteOne(query);
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.updateComment = async function (query, comment) {
    try {
        //var users = await User.find(query)
        commentCollection.findOneAndUpdate(query, 
            { $set: {
                "description": comment.description,
                "whoLiked": comment.whoLiked,
                "likes": comment.likes
                },
            });
        var comments = await commentCollection.findOne(query)
        return comments;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}
