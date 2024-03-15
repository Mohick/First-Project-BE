const Admin = require("../../Schema/SchemaAdmin/Admin");

class HomePageAccount {
  // Renders the homepage with mode selection if admin session exists
  async chooseMode(req, res, next) {
    try {
      // Check if an admin session exists
      if (!!req.session.admin) {
        // Fetch admin data
        await Admin.findOne({ _id: req.session.admin._id }).then((result) => {
          if (!!result) {
            // Extract admin username
            const nameAdmin = result.toObject().username;
            // Render the choose mode view with admin name
            res.render("./Account/choose mode", { nameAdmin });
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

module.exports = new HomePageAccount();
