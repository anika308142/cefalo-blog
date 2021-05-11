const db = require('../models');
const User = db.User;
var generateToken = require('../utils/generateToken');
let options = {};
// const errHandler = (err) => {
//   console.error("Error", err);
// }
exports.createUser = async (req, res) => {
  if (!req.body.uid || !req.body.password) {
    res.status(400);
    res.json({
      message: "Username or password can not be empty!"
    });
    return;
  }
  const [users, created] = await User.findOrCreate({
    where: { uid: req.body.uid },
    defaults: {
      uid: req.body.uid,
      name: req.body.name,
      password: req.body.password
    }
  });
  if (created) {
    const token = await generateToken.generateAccessToken({ uid: req.body.uid });
    res.cookie('Authorization', token, [options]);
    res.status(201);
    res.json({ message: "Registration Successful!" });
  }

  else {
    res.cookie('Authorization', 'null', [options])
    res.status(409);
    res.json({ message: "User already exists please login!" });
  }
};
exports.loginUser = async (req, res) => {
  if (!req.body.uid || !req.body.password) {
    res.status(400);
    res.json({
      message: "Username or password can not be empty!"
    });
    return;
  }
  let users = await User.findOne({
    where: {
      uid: req.body.uid,
      password: req.body.password
    }
  });
  if (users == null) {
    res.cookie('Authorization', 'null', [options]);
    res.status(404);
    res.json({
      message: "User ID or Password is incorrect!"
    });
  }
  else {
    const accessToken = await generateToken.generateAccessToken({ uid: req.body.uid });
    res.cookie('Authorization', accessToken, [options]);
    res.status(200);
    res.json({
      message: "Log in successful!"
    });

  }
};

