const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Article = require("../models/article");
const Comment = require("../models/comment");
const bcrypt = require("bcryptjs");

router.get("/deleteUserByAdmin/:id", async (req, res) => {
  if (req.session.user && req.cookies.user_seed) {
    const userId = req.params.id;
    try {
      await User.findByIdAndDelete(userId);
      await Article.deleteMany({
        userId: userId,
      });
      await Comment.deleteMany({
        writerId: userId,
      });
      res.redirect("/admin");
    } catch (error) {
      res.status(500).render("error_pages/range_500", { msg: error });
    }
  } else {
    res.redirect("/");
  }
});

router.get("/deleteUser", async (req, res) => {
  if (req.session.user && req.cookies.user_seed) {
    const userId = req.session.user._id;
    try {
      await User.findByIdAndDelete(userId);
      await Article.deleteMany({
        userId: userId,
      });
      await Comment.deleteMany({
        writerId: userId,
      });
      res.redirect("/logout");
    } catch (error) {
      res.status(500).render("error_pages/range_500", { msg: error });
    }
  } else {
    res.redirect("/");
  }
});

router.post("/passwordChanging/:id", async (req, res) => {
  try {
    if (
      req.session.user &&
      req.cookies.user_seed &&
      req.session.user.role === "admin"
    ) {
      // let password = req.body.password;
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) res.render("error_pages/range_500", { msg: err });

        await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            password: hash,
          }
        );
      });

      res.redirect("/admin");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).render("error_pages/range_500", { msg: error });
  }
});

module.exports = router;
