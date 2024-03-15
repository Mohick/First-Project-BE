const DataDiscover = require("../../../Schema/SchemaDiscover/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsTrash {
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      if (!!req.session.admin) {
        // Find admin data by ID
        await Admin.findOne({ _id: req.session.admin._id }).then(async (admin) => {
          // Check if admin exists
          if (!!admin) {
            // Extract admin username
            const nameAdmin = admin.toObject().username;
            // Find deleted Discover items
            const discover = await DataDiscover.findDeleted();
            // Convert discover items to plain objects
            const resultData = discover.map((data) => data.toObject());
            // Render trash view with admin username and deleted Discover items
            return res.render("./Discover/views mode/views trash", { nameAdmin, resultData: JSON.stringify(resultData) });
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

module.exports = new ViewsTrash();
