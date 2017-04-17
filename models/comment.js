var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Commentable = require('./commentable');

var CommentSchema = new Schema(
  {},
  {
    discriminatorKey: 'kind'
  }
);

var Comment = Commentable.discriminator('Comment', CommentSchema);

module.exports = Comment;
