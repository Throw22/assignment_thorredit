var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;

var models = {};

// Load models and attach to models here
models.User = require('./user');
models.Comment = require('./comment');
models.Commentable = require('./commentable');
models.Post = require('./post');

module.exports = models;
