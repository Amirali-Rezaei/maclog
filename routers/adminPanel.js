const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Article = require("../models/article");
const Comment = require("../models/comment");
const upload = require("../tools/uploadFile");

router.get("/", async (req, res) => {
  if (
    req.session.user &&
    req.cookies.user_seed &&
    req.session.user.role === "admin"
  ) {
    const user = req.session.user;
    const bloggers = await User.find({ role: "blogger" });
    const admins = await User.find({ role: "admin" });
    const articles = await Article.find({ writer: req.session.user._id }).sort({
      createdAt: -1,
    });
    const comments = await Comment.find({});

    res.render("adminPanel", {
      bloggers,
      admins,
      articles,
      comments,
      user,
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/", async (req, res) => {
  try {
    let user = false;
    if (req.body.userName != req.session.user.userName) {
      user = await User.findOne(req.body.userName);
    }
    if (!user) {
      const newUser = await User.findByIdAndUpdate(
        req.session.user._id,
        req.body,
        { new: true }
      );
      req.session.user = newUser;
      res.redirect("/dashboard");
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/changePhoto",
  upload.single("profile_photo"),
  async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.session.user._id, {
        photo: req.file.filename,
      });
      req.session.user.photo = req.file.filename;
      res.redirect("/dashboard");
    } catch (error) {
      res.status(500).render("error_pages/range_500", { msg: error });
    }
  }
);

module.exports = router;
