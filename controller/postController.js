const db = require('../models');
const Post = db.Post;
const User = db.User;

const errHandler = (err) => {
  console.error("Error", err);
}
exports.createPost = async (req, res) => {
  const post = await Post.create({
    pid: req.body.pid,
    uid: req.body.uid,
    title: req.body.title,
    story: req.body.story
  }).catch(errHandler);
  res.send("successful");
};

exports.readPost = async (req, res) => {
  User.hasMany(Post, { foreignKey: 'uid' });
  Post.belongsTo(User, { foreignKey: 'uid' });
  const posts = await Post.findAll({
    include: [{
      model: User,
      attributes: ['name'],
      required: true
    }]
  }).catch(errHandler);
  res.send(posts);
};

exports.readPostbyPid = async (req, res) => {
  const posts = await Post.findAll({
    where: {
      pid: req.params.pid,
    }
  }).catch(errHandler);
  res.send(posts);
};

exports.updatePost = async (req, res) => {
  const posts = await Post.update({
    title: req.body.title,
    story: req.body.story

  }, {
    where: {
      pid: req.params.pid,
      uid: req.body.uid,
    }
  }).catch(errHandler);
  res.send(posts);

};

exports.deletePost = async (req, res) => {

  const posts = await Post.destroy({
    where: {
      pid: req.params.pid,

    }
  }).catch(errHandler);
  res.send("deleted");

};