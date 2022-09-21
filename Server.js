const express = require("express");
const bodyParser = require("body-parser");
const db = require("./Models/index");
const users = require("./Routers/user.router");
const posts = require("./Routers/posts.router");
const comment = require("./Routers/comments.router");
const like = require("./Routers/likes.router");
const auth = require("./Routers/auth.router");
const { validateJWTToken } = require("./Common/helper");
//const cron = require("node-cron");
const passport = require("passport");
const session = require("express-session");
require("./Common/passport_setup");

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/post-image/", express.static("./Public/images"));

app.use("/user", validateJWTToken, users);
app.use("/posts", validateJWTToken, posts);
app.use("/comment", validateJWTToken, comment);
app.use("/likes", validateJWTToken, like);
app.use("/auth", auth);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can access his info in: req.user
app.get("/good", (req, res) => {
  console.log(req.user.photos[0].value);
  res.render("pages/profile.ejs", {
    name: req.user.displayName,
    pic: req.user._json.picture,
    email: req.user.emails[0].value,
    profile: "google",
  });
});

// Auth Routes
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("/good");
    // res.render("pages/profile.ejs", {
    //   name: req.user.displayName,
    //   pic: req.user._json.picture,
    //   email: req.user.emails[0].value,
    //   profile: "google",
    // });
  }
);

app.get("/profile", (req, res) => {
  // console.log("----->", req.user);
  res.render("pages/profile", {
    profile: "google",
    name: req.user.displayName,
    pic: req.user.photos[0].value,
    email: req.user.emails[0].value, // get the user out of session and pass to template
  });
});

//facebook
app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

app.get("/good", (req, res) => {
  console.log(req.user.photos[0].value);
  res.render("pages/profile.ejs", {
    name: req.user.displayName,
    pic: req.user._json.picture,
    email: req.user.emails[0].value,
    profile: "facebook",
  });
});

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/good",
  })
);

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//create table if not exists
db.sequelize.sync({ force: false });
//server
app.listen(5000, () => {
  console.log("Server is running on Port: 5000");
});

