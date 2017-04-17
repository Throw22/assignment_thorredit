var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var models = require('./../models');
var Post = mongoose.model('Post');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');


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
    .populate('author')
    .populate({
      path: 'comments author',
      populate: {
        path: 'comments author',
        populate: {
          path: 'comments author',
          populate: {
            path: 'author'
          }
        }
      }
    })
    .then(post => {
      console.log(post);
      res.render('posts/show', { post });
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// New comment
// ----------------------------------------
router.get('/:postid/newcomment/:parentid', (req, res) => {
  let postid = req.params.postid;
  let parentid = req.params.parentid;
  if (postid === parentid) {
    Post.findById(postid)
      .then(commentable => {
        let parentType = "post";
        res.render('comment/new', { commentable, postid, parentid, parentType })
      })    
  } else {
    Comment.findById(parentid)
      .then(commentable => {
        let parentType = "comment";
        res.render('comment/new', { commentable, postid, parentid, parentType })
      })  
  }
})

// ----------------------------------------
// Post new comment
// ----------------------------------------
router.post('/newcomment', (req, res) => {
  let postid = req.body.postid;
  let parentid = req.body.parentid;
  User.findById('58f535423c62619d2594697b').then((author) => {
    var comment = new Comment({
      body: req.body.body,
      author: author,
      score: 0
    });
    comment.save();
    if (postid === parentid) {
      Post.findById(postid).then((post) => {
        post.comments.push(comment);
        post.save().then(() => {
          res.redirect(`${postid}`);
        })        
      })
    } else {
      Comment.findById(parentid).then((parentComment) => {
        parentComment.comments.push(comment);
        parentComment.save().then(() => {
          res.redirect(`${postid}`);
        })        
      })
    }
  })

})




module.exports = router;
