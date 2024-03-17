const Admin = require("../../Schema/SchemaAdmin/Admin");

class HomePageAccount {
  // Renders the homepage with mode selection if admin session exists
  async chooseMode(req, res, next) {
    try {
      // Check if an admin session exists
      const { email, password } = req.session.admin;

      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Render the homepage with mode selection
        res.render("./Account/choose mode", { nameAdmin: email });
      } else {
        // Redirect back if admin session doesn't exist
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new HomePageAccount();
