var express = require('express');
const postController = require('../controller/postController');
var router = express.Router();
var authenticateToken=require('../middleware/authenticateToken');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('get all users');
// });
// router.get('/{id}', function(req, res) {
//   res.send('get all user by id');
// });swsdwd

router.post('/',authenticateToken,function(req, res) {
 // res.send('create user');
 console.log("in post router");
 postController.createPost(req, res);
});

router.get('/',authenticateToken,function(req, res, next) {
  postController.readPost(req, res);
});

router.get('/:pid', function(req, res, next) {
  postController.readPostbyPid(req, res);
});

router.put('/', function(req, res, next) {
  postController.updatePost(req, res);
});
router.delete('/:pid', function(req, res, next) {
  postController.deletePost(req, res);
});

module.exports = router;