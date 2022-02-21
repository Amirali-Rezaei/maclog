const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const auth = require("./routers/auth");
const session = require("express-session");
const articleRouter = require("./routers/article");

mongoose.connect(
  "mongodb://root:Se6HeNZBVhXcBDHppDW34q1i@maclog-db:27017/my-app?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(join(__dirname, "/public")));
app.use(cookieParser());
// Session
app.use(
  session({
    secret: "12345",
    key: "user_seed",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 300000,
    },
  })
);
app.use("/", auth);
app.use("/", articleRouter);

app.use(function (req, res) {
  res.status(404);

  res.render("error_pages/404");
  return;
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
