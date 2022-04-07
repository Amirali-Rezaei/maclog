const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const auth = require("./routers/auth");
const session = require("express-session");
const articleRouter = require("./routers/article");
const morgan = require("morgan");
const port = process.env.PORT || 3000;

// Server: mongodb://root:Se6HeNZBVhXcBDHppDW34q1i@arthur.iran.liara.ir:32691/my-app?authSource=admin
// {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// authSource: "admin",
// }

mongoose
  .connect(
    "mongodb://root:Se6HeNZBVhXcBDHppDW34q1i@arthur.iran.liara.ir:32691/my-app?authSource=admin",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin",
    }
  )
  .then((r) => console.log("Successfully connected to database"));

app.use(morgan("tiny"));
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
  res.status(404).render("error_pages/404");
});

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
