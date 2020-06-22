var Post = require('../models/post.model')

exports.getAllPost = async function (query) {
    try {
        //var users = await User.find(query)
        var posts = postCollection.find(query).sort({ date: -1, likes: -1}).toArray();
        return posts;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.getAllUserPost = async function (query) {
    try {
        //var users = await User.find(query)
        var posts = postCollection.find(query).sort({ date: -1, likes: -1}).toArray();
        return posts;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.createPost = async function (post) {
    try {
        //var users = await User.find(query)
        var posts = postCollection.insertOne(post).toArray();
        return posts;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.deletePost = async function (query) {
    try {
        //var users = await User.find(query)
        var posts = postCollection.deleteOne(query);
        return posts;
    } catch (e) {
        // Log Errors
        throw Error('Error')
    }
}

exports.deletePost = async function (query, newPost) {
    try {
        //var users = await User.find(query)
        postCollection.findOneAndUpdate(query,
        { $set: {
            "title": newPost.title,
            "description": newPost.description,
            "image": newPost.image,
            "whoLiked": newPost.whoLiked,
            "likes": newPost.likes
            },
        }, function(err, res){
            if (err) throw err;
            if(!err){
                var posts = postCollection.findOne(query);
                return posts;
            }
        });
    } catch (e) {
        throw Error('Error')
    }
}

