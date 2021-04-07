var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var postsRouter = require('./posts');
/* GET home page. */

 router.get('/', function(req, res, next) {
  res.send( "blog ");
 });
 router.use('/users', usersRouter);
 router.use('/posts', postsRouter);
module.exports = router;
