const db = require('../models');
var generateToken = require('../utils/generateToken');
const User = db.User;
let options = {};
const errHandler = (err) => {
  console.error("Error", err);
}
exports.createUser = async (req, res) => {
  if (!req.body.uid || !req.body.password) {
    res.status(400).json({
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
  }).catch(errHandler);
  if (created) {
    const token = await generateToken.generateAccessToken({ uid: req.body.uid });
    res.cookie('Authorization', token, [options]);
    res.status(201).json({ message: "Registration Successful!" });
  }
  else {
    res.cookie('Authorization', 'null', [options])
    res.status(409).json({ message: "User already exists please login!" });
  }
};
exports.loginUser = async (req, res) => {
  if (!req.body.uid || !req.body.password) {
    res.status(400).json({
      message: "Username or password can not be empty!"
    });
    return;
  }
  let users = await User.findOne({
    where: {
      uid: req.body.uid,
    }
  }).catch(errHandler);
  if (users == null) {
    res.cookie('Authorization', 'null', [options]);
    res.status(404).json({
      message: "User not found please register!"
    });
    return;
  }
  users = await User.findOne({
    where: {
      uid: req.body.uid,
      password: req.body.password
    }
  }).catch(errHandler);
  if (users == null) {
    res.cookie('Authorization', 'null', [options]);
    res.status(403).json({
      message: "Password is incorrect!"
    });
  }
  else {
    const accessToken = await generateToken.generateAccessToken({ uid: req.body.uid });
    res.cookie('Authorization', accessToken, [options]);
    res.status(200).json({
      message: "Log in successful!"
    });

  }
};

