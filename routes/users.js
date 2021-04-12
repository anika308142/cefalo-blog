var express = require('express');
const userController = require('../controller/userController');
var router = express.Router();

router.post('/', function(req, res) {
 console.log("in user router");
  userController.createUser(req, res);
});

router.post('/login', function(req, res, next) {
   userController.loginUser(req, res);
});
module.exports = router;
