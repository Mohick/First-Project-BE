const Admin = require("../Schema/SchemaAdmin/Admin");
class MainPage {
  async home(req, res, next) {
    try {
      if (!!req.session.admin) {
        await Admin.findOne({ _id: req.session.admin._id }).then((result) => {
          if (!!result) {
            const nameAdmin = result.toObject().username;
            return res.render('home page',{nameAdmin});
          } else {
            return res.redirect("/login/");
          }
        });
      } else {
        return res.redirect("/login/");
      }
    } catch (next) {
      return next;
    }
  }
}
module.exports = new MainPage();
