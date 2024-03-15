const Admin = require("../Schema/SchemaAdmin/Admin");

class MainPageController {
  async home(req, res, next) {
    try {
      // Check if admin is logged in
      if (req.session.admin) {
        // Find admin data
        const result = await Admin.findOne({ _id: req.session.admin._id });
        if (result) {
          // Render home page with admin name
          const nameAdmin = result.toObject().username;
          return res.render('home page', { nameAdmin });
        } else {
          // Redirect back if admin data is not found
          return res.redirect("back");
        }
      } else {
        // Redirect back if admin is not logged in
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors
      console.error("Error in MainPageController:", error);
      // Pass the error to the next middleware
      next(error);
    }
  }
}

module.exports = new MainPageController();
