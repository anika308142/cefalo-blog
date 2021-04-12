const db = require('../models');
const Post = db.Post;
const User = db.User;
const { Op } = require("sequelize");
const errHandler = (err) => {
  console.error("Error", err);
}
exports.createPost = async (req, res) => {
  const post = await Post.create({
    pid:Math.random(),
    uid: req.user.uid,
    title: req.body.title,
    story: req.body.story
  }).catch(errHandler);
  res.send("successful");
};

exports.readPost = async (req, res) => {
  User.hasMany(Post, {foreignKey: 'uid'});
  Post.belongsTo(User, {foreignKey: 'uid'});
  
  // const posts=await Post.findAll({
  //   include: [{
  //     model: User,
  //     attributes: ['name'],
  //     required: true
  //    }]
  // });
  //   console.log("in post read  contrroller");
 const posts= await Post.findAll();
    res.send(posts);
      };

exports.readPostbyPid = async (req, res) => {
  const posts = await Post.findAll({
    where: {
      pid: req.params.pid,
    }
  }).catch(errHandler);
  if(posts==1)
  {res.send(posts);}
  else {res.send("not found");}
};

exports.updatePost = async (req, res) => {
  
  const posts = await Post.update({
    title: req.body.title,
    story: req.body.story

  }, {
    where: {
      pid: req.params.pid,
      uid: req.user.uid,
    }
  }).catch(errHandler);
  if(posts==1)
  {res.send("updated");}
  else {res.send("failed");}

};

exports.deletePost = async (req, res) => {

  const posts = await Post.destroy({
    where: {
      pid: req.params.pid,
      uid: req.user.uid,
    }
  }).catch(errHandler);
  if(posts==1)
  {res.send("deleted");}
  else {res.send("failed");}

};