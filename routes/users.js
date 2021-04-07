var express = require('express');
const userController = require('../controller/userController');
var router = express.Router();


/* GET users listing. */

// router.get('/{id}', function(req, res) {
//   res.send('get all user by id');
// });swsdwd

router.post('/', function(req, res) {
 // res.send('create user');
 console.log("in user router");
  userController.createUser(req, res);
});

// router.get('/', function(req, res, next) {
//   userController.createUser(req, res);
// });
module.exports = router;
//module.exports = router;