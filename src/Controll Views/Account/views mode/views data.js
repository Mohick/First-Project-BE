const DataUser = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsData {
  async views(req, res, next) {
    try {
      if (!!req.session.admin) {
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          DataUser.find({}),
        ]).then(([admin, account]) => {
          if (!!admin) {
            const nameAdmin = admin.toObject().username;
            const resultData = account.map((data) => {
              return data.toObject();
            });
            return res.render("./Account/views mode/views data", {
              nameAdmin,
              resultData: JSON.stringify(resultData),
            });
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

module.exports = new ViewsData();
