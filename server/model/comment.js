const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const postSchema = new Schema({
  description: { type: String },
  likes: { type: String },
  whoLiked: { type: String },
  date: { type: String }
}, { collection : 'comment' });
 
const Comment = mongoose.model('Comment', postSchema);
module.exports = Comment;