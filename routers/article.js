const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const upload = require("../tools/uploadFile");
const User = require("../models/user");
const Comment = require("../models/comment");

// Index page
router.get("/", async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: -1 });
  let isLoggedIn = false;
  if (req.session.user && req.cookies.user_seed) {
    isLoggedIn = true;
  }
  res.render("index", { articles, isLoggedIn });
});

// Create
router.get("/createArticle", (req, res) => {
  if (req.session.user && req.cookies.user_seed) {
    const isLoggedIn = true;
    res.render("article/create", { userId: req.session.user._id, isLoggedIn });
  } else {
    res.redirect("/login");
  }
});

// Create
router.post(
  "/createArticle",
  upload.single("article_pic"),
  async (req, res) => {
    try {
      // const { fName, lName } = await User.findOne({
      //   _id: req.session.user._id,
      // });
      const writer = req.session.user;
      await Article.create({
        title: req.body.title,
        body: req.body.body,
        image: req.file.filename,
        // userId: req.body.userId,
        writer: writer,
      });

      res.redirect("/dashboard");
    } catch (error) {
      res.render("error_pages/range_500", { msg: error });
    }
  }
);

// Read
router.get("/readArticle/:id", async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id }).populate('writer');
    const comments = await Comment.find({ articleId: article._id });
    let isLoggedIn = false;

    if (!comments) {
      article.comments = [];
    }

    if (req.session.user && req.cookies.user_seed) {
      isLoggedIn = true;
    }

    res.render("article/read", { article, isLoggedIn, comments });
  } catch (error) {
    res.render("error_pages/range_500", { msg: error });
  }
});

// Delete
router.get("/deleteArticle/:id", async (req, res) => {
  if (req.session.user && req.cookies.user_seed) {
    try {
      await Article.findOneAndDelete({ _id: req.params.id });

      res.redirect("/dashboard");
    } catch (error) {
      res.render("error_pages/range_500", { msg: error });
    }
  } else {
    res.redirect("/login");
  }
});

// Edit Article
router.get("/editArticle/:id", async (req, res) => {
  try {
    if (req.session.user && req.cookies.user_seed) {
      const article = await Article.findOne({ _id: req.params.id });

      res.render("article/update", { article, isLoggedIn: true });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.render("error_pages/range_500", { msg: error });
  }
});

// Edit Article
router.post("/editArticle/:id", async (req, res) => {
  try {
    if (req.session.user && req.cookies.user_seed) {
      await Article.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          body: req.body.body,
        }
      );

      res.redirect("/dashboard");
    }
  } catch (error) {
    res.render("error_pages/range_500", { msg: error });
  }
});

router.post(
  "/editArticlePicture/:id",
  upload.single("article_pic"),
  async (req, res) => {
    try {
      if (req.session.user && req.cookies.user_seed) {
        await Article.findOneAndUpdate(
          { _id: req.params.id },
          {
            image: req.file.filename,
          }
        );
      }
      res.redirect("/dashboard");
    } catch (error) {
      res.render("error_pages/range_500", { msg: error });
    }
  }
);

// Comments
// router.post("/createComment/:id", async (req, res) => {
//   try {
//     if (req.session.user && req.cookies.user_seed) {
//       const article = await Article.findOne({ _id: req.params.id });
//       const user = req.session.user;
//       if (article.comments.length != 0) {
//         article.comments = JSON.parse(article.comments);
//       } else {
//         article.comments = [];
//       }
//       article.comments.push({
//         name: `${user.fName} ${user.lName}`,
//         body: req.body.comment,
//       });
//       article.comments = JSON.stringify(article.comments);

//       await Article.updateOne({ _id: article._id }, article);
//       res.redirect(`/readArticle/${req.params.id}`);
//     } else {
//       res.redirect("/login");
//     }
//   } catch (error) {
//     res.render("error_pages/range_500", { msg: error });
//   }
// });

// function checkIfPhotoHasChanged(req, res, next) {
//   console.log(req.body);
//   if (req.file !== undefined) {
//     upload.single("article_pic");
//   }
//   next();
// }

module.exports = router;
