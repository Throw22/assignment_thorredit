var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');

// ----------------------------------------
// Index
// ----------------------------------------
router.get('/', (req, res) => {
  Post.find({})
    .populate('author')
    .then(posts => {
      res.render('posts/index', { posts });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .populate('author') //Gets author name for post
    .populate({
      path: 'comments', //Gets first level comment
      populate: {
        path: 'author', //Gets first level comment author
        populate: { path: 'comments', populate: { path: 'author' } } //Get nested comment and author
      }
    })
    .then(post => {
      console.log(post);
      res.render('posts/show', { post });
    })
    .catch(e => res.status(500).send(e.stack));

  //Gets author for first-level comments
  // .populate(
  //   { path: 'comments.comments', populate: { path: 'author' } } //Get comments of those comments (currently just ID)
  // )
});

module.exports = router;
