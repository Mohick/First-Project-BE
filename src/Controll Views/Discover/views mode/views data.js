const Discover = require("../../../Schema/SchemaDiscover/Schema");


class ViewsData {
  // Render view for Discover data
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      const { email, password } = req.session.admin;

      // Check if the session corresponds to an admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Fetch admin data and all Discover data
        // You're not using the Admin model here. If you intend to use it, you need to fetch admin data from the database.

        // Find all Discover data
        Discover.find({}).then((discover) => {
          // Convert Discover data to object
          const resultData = discover.map((data) => {
            return data.toObject();
          });

          // Render Discover data view
          return res.render("./Discover/views mode/views data", {
            nameAdmin: email,
            resultData: JSON.stringify(resultData), // Converting resultData to JSON string for passing to view
          });
        });
      } else {
        // Redirect if admin session doesn't exist
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
       // return next(error); //only use when development 
       return res.redirect("back");
    }
  }
}

module.exports = new ViewsData();
