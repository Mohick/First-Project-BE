const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsData {
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      if (!!req.session.admin) {
        // Fetch admin and all user data
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          SchemaAccount.find({}),
        ]).then(([admin, account]) => {
          if (!!admin) {
            // Extract admin username and convert user data to JSON
            const nameAdmin = admin.toObject().username;
            const resultData = account.map((data) => {
              return data.toObject();
            });
            // Render the view with admin name and user data
            return res.render("./Account/views mode/views data", {
              nameAdmin,
              resultData: JSON.stringify(resultData),
            });
          } else {
            // Redirect to login if admin not found
            return res.redirect("/login/");
          }
        });
      } else {
        // Redirect to login if admin session does not exist
        return res.redirect("/login/");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new ViewsData();
