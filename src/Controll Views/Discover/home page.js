const Admin = require("../../Schema/SchemaAdmin/Admin");

class HomePageDiscover {
  async chooseMode(req, res, next) {
    try {
      // Check if admin session exists
      if (!!req.session.admin) {
        // Find admin data by ID
        await Admin.findOne({ _id: req.session.admin._id }).then((admin) => {
          // Check if admin exists
          if (!!admin) {
            // Extract admin username
            const nameAdmin = admin.toObject().username;
            // Render choose mode page with admin username
            return res.render("./Discover/choose mode", { nameAdmin });
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
      // Pass any errors to the next middleware
      return next(error);
    }
  }
}

module.exports = new HomePageDiscover();
