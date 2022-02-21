const express = require("express");
const router = express.Router();
const login = require("./login");
const signUp = require("./signUp");
const dashboard = require("./dashboard");
const adminPanel = require("./adminPanel");
const comment = require("./comment");
const userControl = require("./userControl");

router.use("/login", login);
router.use("/signUp", signUp);
router.use("/dashboard", dashboard);
router.use("/admin", adminPanel);
router.use("/comment", comment);
router.use("/userControl", userControl);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("user_seed");
  res.redirect("/");
});

module.exports = router;
