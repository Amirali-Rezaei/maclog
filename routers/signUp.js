const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validate = require("../tools/userValidator");
const upload = require("../tools/uploadFile");

router.get("/", (req, res) => {
  if (req.session.user && req.cookies.user_seed) {
    res.redirect("/dashboard");
  } else {
    res.render("signUp", { msg: "" });
  }
});

router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    const isFine = validate(req);
    if (isFine.success && !user) {
      await User.create({
        fName: req.body.fName,
        lName: req.body.lName,
        userName: req.body.userName,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role || "blogger",
        gender: req.body.gender,
        photo: req.file.filename,
      });

      res.redirect("/login");
    } else {
      if (user) {
        return res.render("signUp", { msg: "نام کاربری نباید تکراری باشد" });
      }
      return res.render("signUp", { msg: isFine.msg });
    }
  } catch (error) {
    res.render("signup", { msg: error });
  }
});

// router.get("/createAdmin", (req, res) => {
//   if (
//     req.session.user &&
//     req.cookies.user_seed &&
//     req.session.user.role === "admin"
//   ) {
//     res.render("createAdmin");
//   } else {
//     res.redirect("/login");
//   }
// });

// router.post("/createAdmin", async (req, res) => {
//   try {
//     const user = await User.findOne({ userName: req.body.userName });

//     if (validate(req) && !user) {
//       await User.create({
//         fName: req.body.fName,
//         lName: req.body.lName,
//         userName: req.body.userName,
//         password: req.body.password,
//         phoneNumber: req.body.phoneNumber,
//         role: req.body.role || "admin",
//         gender: req.body.gender,
//       });

//       res.redirect("/admin");
//     } else {
//       res.redirect("/admin/createAdmin");
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
