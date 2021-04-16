var express = require('express');
const postController = require('../controller/postController');
var router = express.Router();
var authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, postController.createPost);

router.get('/', postController.readPost);

router.get('/:pid', postController.readPostbyPid);

router.put('/:pid', authenticateToken, postController.updatePost);

router.delete('/:pid', authenticateToken, postController.deletePost);

module.exports = router;