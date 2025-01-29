const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  videoLink: String,
  comment: String,
  maskedUsername: String,
  sentiment: String,
  createdAt: Date,
});

module.exports = mongoose.model('Comment', CommentSchema);