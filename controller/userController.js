const db = require('../models');
var generateToken = require('../utils/generateToken');
const User = db.User;
let options = {};
const errHandler = (err) => {
  console.error("Error", err);
}
exports.createUser = async (req, res) => {
  if (!req.body.uid) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const token = await generateToken.generateAccessToken({ uid: req.body.uid });
  res.cookie('Authorization', token, [options]);
  const user = await User.create({
    uid: req.body.uid,
    name: req.body.name,
    password: req.body.password
  }).catch(errHandler);
  res.send("successful");
};
exports.loginUser = async (req, res) => {
  const users = await User.findOne({
    where: {
      uid: req.body.uid,
      password: req.body.password
    }
  }).catch(errHandler);
  if (users == null) {
    res.cookie('Authorization', 'null', [options]);
    res.send("not found");
  }
  else {
    const accessToken = await generateToken.generateAccessToken({ uid: req.body.uid });
    res.cookie('Authorization', accessToken, [options]);
    res.send("login");

  };
};

