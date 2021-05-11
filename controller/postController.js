const db = require('../models');
const { nanoid } = require("nanoid/non-secure");
const contentNegotiation = require('../utils/contentNegotiation');
const Post = db.Post;
const User = db.User;
const { Op } = require("sequelize");

exports.createPost = async (req, res) => {
  if (!req.body.title || !req.body.story) {
    res.status(400);
    res.json({
      message: "Title or story must not be empty"

    })
    return;
  }
  let d=new Date();
  let  pid = nanoid()+req.user.uid+d.toISOString()+Date.now();
  console.log(pid);
  const post = await Post.create({
    pid: pid,
    uid: req.user.uid,
    title: req.body.title,
    story: req.body.story
  });
  res.status(201);
  res.json(
    {
      message: "Story posted successfully!"
    }
  );
};

exports.readPost = async (req, res) => {
  console.log("in post read  contrroller");
  const posts = await Post.findAll();
  if (posts) {
    res.status(200);
    contentNegotiation(res, posts);
  }
  else {
    res.status(404);
    res.json({
      message: "Not found!"

    });
  }
};

exports.readPostbyPid = async (req, res) => {
  const posts = await Post.findOne({
    where: {
      pid: req.params.pid,
    }
  });
  if (posts) {
    res.status(200);
    contentNegotiation(res, posts);
  }
  else {
    res.status(404);
    res.json({
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
  });
  if (posts == 1) { res.status(200);
    res.json({ message: "Updated" }); }
  else { res.status(403);
    res.json({ message: "Failed" }); }

};

exports.deletePost = async (req, res) => {

  const posts = await Post.destroy({
    where: {
      pid: req.params.pid,
      uid: req.user.uid,
    }
  });
  if (posts == 1) { res.status(200);
    res.json({ message: "Deleted" }); }
  else { res.status(403);
    res.json({ message: "Failed" }); }

};