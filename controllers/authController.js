const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

const strategy = new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { msg: "Incorrect username" });
    bcrypt.compare(password, user.password, (err, res) => {
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { msg: "Incorrect password" });
      }
    });
  });
});

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.sign_up = (req, res) => res.render("sign_up");

exports.sign_up_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) return next(err);
    const { first_name, last_name, username, password, messages } = req.body;
    const user = new User({
      first_name,
      last_name,
      username,
      password,
      messages,
      password: hashedPass,
    });
    user.save((err) => {
      if (err) return next(Err);
      res.redirect("/");
    });
  });
};
