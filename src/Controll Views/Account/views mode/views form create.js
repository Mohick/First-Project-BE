const DataUser = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsFormCreated {
  async views(req, res, next) {
    try {
      if (!!req.session.admin) {
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          DataUser.find({}),
        ]).then(([admin, account]) => {
          if (!!admin) {
            const nameAdmin = admin.toObject().username;
            const resultData = account.map((data) => data.toObject());
            res.render("./Account/views mode/views form create", {
              resultData: JSON.stringify(resultData),
              nameAdmin: nameAdmin,
            });
          } else {
            res.redirect("/login/");
          }
        });
      } else {
        res.redirect("/login/");
      }
    } catch (next) {
      return next;
    }
  }
}

module.exports = new ViewsFormCreated();
