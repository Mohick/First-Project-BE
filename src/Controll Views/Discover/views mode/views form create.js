const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsFormCreated {
  // Render view for form creation
  async views(req, res, next) {
    try {
      // Extract email and password from admin session
      const { email, password } = req.session.admin;

      // Check if an admin session exists
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // If admin session exists, render the form creation view
        return res.render("./Discover/views mode/views form create", {
          nameAdmin: email,
        });
      } else {
        // Redirect to the previous page if admin session doesn't exist
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new ViewsFormCreated();
