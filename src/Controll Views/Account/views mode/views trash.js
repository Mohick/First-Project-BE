const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsTrash {
  // Renders the trash view if admin session exists
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      if (!!req.session.admin) {
        // Fetch admin and all deleted account data
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          SchemaAccount.findDeleted({}),
        ]).then(([admin, account]) => {
          if (!!admin) {
            // Extract admin username and convert deleted account data to JSON
            const nameAdmin = admin.toObject().username;
            const resultData = account.map((data) => {
              return data.toObject();
            });
            // Render the trash view with admin name and deleted account data
            return res.render("./Account/views mode/views trash", {
              nameAdmin,
              resultData: JSON.stringify(resultData),
            });
          } else {
            // Redirect back if admin not found
            return res.redirect("back");
          }
        });
      } else {
        // Redirect back if admin session does not exist
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new ViewsTrash();
