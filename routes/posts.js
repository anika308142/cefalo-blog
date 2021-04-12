var express = require('express');
const postController = require('../controller/postController');
var router = express.Router();
var authenticateToken=require('../middleware/authenticateToken');

router.post('/',authenticateToken,function(req, res) {
 postController.createPost(req, res);
});

router.get('/',function(req, res, next) {
  postController.readPost(req, res);

});

router.get('/:pid', function(req, res, next) {
  postController.readPostbyPid(req, res);
});

router.put('/:pid',authenticateToken, function(req, res, next) {
  postController.updatePost(req, res);
});
router.delete('/:pid',authenticateToken, function(req, res, next) {
  postController.deletePost(req, res);
});

module.exports = router;