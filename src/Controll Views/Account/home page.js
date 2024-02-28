const Admin = require("../../Schema/SchemaAdmin/Admin");

class HomePageAccount {
  async chooseMode(req, res, next) {
    try {
    
      if (!!req.session.admin) {
        await Admin.findOne({ _id: req.session.admin._id }).then((result) => {
          if (!!result) {
            const nameAdmin = result.toObject().username;
             res.render("./Account/choose mode", {nameAdmin});
          } else {
            return res.redirect("/login/");
          }
        });
      } else {
        return res.redirect("/login/");
      }
    } catch (next) {
      return next();
    }
  }
}

module.exports = new HomePageAccount();
