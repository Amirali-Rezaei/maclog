const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  if (req.session.user && req.cookies.user_seed) {
    if (req.session.user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/dashboard");
    }
  } else {
    res.render("login", { msg: "" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
    });

    if (user) {
      const password = req.body.password;
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        req.session.user = user;
        if (req.session.user.role === "admin") {
          return res.redirect("/admin");
        }
        return res.redirect("/dashboard");
      } else {
        return res.render("login", {
          msg: "رمز عبور نادرست است",
        });
      }
    } else {
      res.render("login", { msg: "نام کاربری پیدا نشد" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
