const Admin = require("../../Schema/SchemaAdmin/Admin");

class AuthenTionAdmin {
  async AuthenTionAdmin(req, res, next) {
    try {
      await Admin.findOne({ email: req.body.email }).then((admin) => {
        if (!!admin) {
            if(admin.email == req.body.email && admin.password == req.body.password) {
                req.session.admin = admin;
                res.redirect("/");
            }
            else {
                res.redirect("/login/");
            }
        } else {
          res.redirect("/login/");
        }
      });
    } catch (error) {}
  }
}

module.exports = new AuthenTionAdmin();
