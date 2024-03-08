const Admin = require("../../Schema/SchemaAdmin/Admin");
class HomePageDiscover {
  async chooseMode(req, res, next) {
    try {
      if (!!req.session.admin) {
        await Admin.findOne({ _id: req.session.admin._id }).then((result) => {
          if (!!result) {
            const nameAdmin = result.toObject().username;
            req.session.admin
            // return res.render("./Discover/choose mode",{nameAdmin});
            
          res.json(req.session)
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

module.exports = new HomePageDiscover();
