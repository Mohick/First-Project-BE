const Discover = require("../../../Schema/SchemaDiscover/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsData {
  // Render view for Discover data
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      if (!!req.session.admin) {
        // Fetch admin data and all Discover data
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          Discover.find({}),
        ]).then(([admin, discover]) => {
          // Check if admin exists
          if (!!admin) {
            // Extract admin username
            const nameAdmin = admin.toObject().username;
            // Convert Discover data to object
            const resultData = discover.map((data) => {
              return data.toObject();
            });
            // Render Discover data view
            return res.render("./Discover/views mode/views data", {
              nameAdmin,
              resultData: JSON.stringify(resultData)
            });
          } else {
            // Redirect if admin doesn't exist
            return res.redirect("back");
          }
        });
      } else {
        // Redirect if admin session doesn't exist
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new ViewsData();
