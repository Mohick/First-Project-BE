const DataUser = require("../../../Schema/SchemaDiscover/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class viewsTrash {
  async views(req, res, next) {
    try {
      if (!!req.session.admin) {
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          DataUser.findDeleted(),
        ]).then(([admin, discover]) => {
          if (!!admin) {
            const nameAdmin = admin.toObject().username;
           const resultData = discover.map((data) => {
              return data.toObject();
            });
            return res.render("./Discover/views mode/views trash", { nameAdmin , resultData: JSON.stringify(resultData)});
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

module.exports = new viewsTrash();
