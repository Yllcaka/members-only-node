const User = require("../models/user");

exports.user_detail = (req, res, next) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) return next(err);
    res.render("user", { title: "Profile", user });
  });
};
