const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  authorId: {type: String},
  likes: { type: String },
  whoLiked: { type: String },
  date: { type: String },
  comment: { type: String },
  image: { type: String }
}, { collection : 'post' });
 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;