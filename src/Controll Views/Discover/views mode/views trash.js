const DataDiscover = require("../../../Schema/SchemaDiscover/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsTrash {
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      const { email, password } = req.session.admin;

      // Check if the session corresponds to an admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Find deleted Discover items
        const discover = await DataDiscover.findDeleted();

        // Convert discover items to plain objects
        const resultData = discover.map((data) => data.toObject());

        // Render trash view with admin username and deleted Discover items
        return res.render("./Discover/views mode/views trash", {
          nameAdmin: email,
          resultData: JSON.stringify(resultData),
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
