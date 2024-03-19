const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsTrash {
  // Renders the trash view if admin session exists
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      const { email, password } = req.session.admin;

      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Find deleted account data
        const accounts = await SchemaAccount.findDeleted({});

        // Convert deleted account data to plain objects
        const accountData = accounts.map((data) => data.toObject());

        // Render the trash view with admin name and deleted account data
        return res.render("./Account/views mode/views trash", {
          nameAdmin: email,
          resultData: JSON.stringify(accountData),
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
