const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const Article = require("../models/article");

router.get("/deleteComment/:id", async (req, res) => {
  try {
    if (req.session.user && req.cookies.user_seed) {
      await Comment.findByIdAndDelete(req.params.id);
      res.redirect("/admin");
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    return res.render("error_pages/range_500", {
      msg: "Error deleting comment",
    });
  }
});

router.post("/createComment/:id", async (req, res) => {
  try {
    let writer;
    let text;
    if (req.session.user && req.cookies.user_seed) {
      writer = `${req.session.user.fName} ${req.session.user.lName}`;
    } else {
      return res.redirect("/login");
    }
    if (!req.body.text) {
      return res.redirect(`/readArticle/${req.params.id}`);
    }
    text = req.body.text;
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.redirect("/404");
    }
    await Comment.create({
      writer,
      writerId: req.session.user._id,
      text,
      articleId: article._id,
    });
    res.redirect(`/readArticle/${req.params.id}`);
  } catch (error) {
    return res.render("error_pages/range_500", {
      msg: "Error creating comment",
    });
  }
});

module.exports = router;
