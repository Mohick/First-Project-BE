const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsFormCreated {
  // Render view for form creation
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      if (!!req.session.admin) {
        // Find admin data by ID
        await Admin.findOne({ _id: req.session.admin._id }).then((result) => {
          // Check if admin exists
          if (!!result) {
            // Extract admin username
            const nameAdmin = result.toObject().username;
            // Render form creation view with admin username
            return res.render("./Discover/views mode/views form create", { nameAdmin });
          } else {
            // Redirect to the previous page if admin doesn't exist
            return res.redirect("back");
          }
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
