var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentableSchema = new Schema(
  {
    body: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true,
    discriminatorKey: 'kind'
  }
);

//virtual for score later

var Commentable = mongoose.model('Commentable', CommentableSchema);

module.exports = Commentable;
