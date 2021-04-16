const db = require('../models');
const { nanoid } = require("nanoid/non-secure");
const contentNegotiation = require('../utils/contentNegotiation');
const Post = db.Post;
const User = db.User;
const { Op } = require("sequelize");
const errHandler = (err) => {
  console.error("Error", err);
}
exports.createPost = async (req, res) => {
  if (!req.body.title || !req.body.story) {
    res.status(400).json({
      message: "Title or story must not be empty"

    })
    return;
  }
  let pid;
  let uniqueId = 0;
  while (uniqueId != 1) {
    pid = nanoid();
    const posts = await Post.findOne({
      where: {
        pid: pid
      }
    }).catch(errHandler);
    if (posts == null) { uniqueId = 1; }

  }
  const post = await Post.create({
    pid: pid,
    uid: req.user.uid,
    title: req.body.title,
    story: req.body.story
  }).catch(errHandler);
  res.status(201).json(
    {
      message: "Story posted successfully!"
    }
  );
};

exports.readPost = async (req, res) => {
  console.log("in post read  contrroller");
  const posts = await Post.findAll();
  if (posts) {
    contentNegotiation(res, posts);
  }
  else {
    res.status(404).json({
      message: "Not found!"

    });
  }
};

exports.readPostbyPid = async (req, res) => {
  const posts = await Post.findOne({
    where: {
      pid: req.params.pid,
    }
  }).catch(errHandler);
  if (posts) {
    contentNegotiation(res, posts);
  }
  else {
    res.status(404).json({
      message: "Not found!"

    });
  }
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
  if (posts == 1) { res.status(200).json({ message: "Updated" }); }
  else { res.status(403).json({ message: "Failed" }); }

};

exports.deletePost = async (req, res) => {

  const posts = await Post.destroy({
    where: {
      pid: req.params.pid,
      uid: req.user.uid,
    }
  }).catch(errHandler);
  if (posts == 1) { res.status(200).json({ message: "Deleted" }); }
  else { res.status(403).json({ message: "Failed" }); }

};