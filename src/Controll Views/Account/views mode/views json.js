const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class JsonAccount {
  // Returns JSON data for accounts if admin session exists
  async json(req, res) {
    try {
      if (!!req.session.admin) {
        // Fetch admin and all account data
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          SchemaAccount.find({}),
        ]).then(([admin, resultData]) => {
          if (!!admin) {
            // Convert account data to JSON objects
            resultData = resultData.map((data) => data.toObject());
            res.json(resultData);
          } else {
            // Redirect back if admin not found
            res.redirect("back");
          }
        });
      } else {
        // Redirect back if admin session does not exist
        res.redirect("back");
      }
    } catch (error) {
      // Handle errors by redirecting back
      res.redirect("back");
    }
  }
}

module.exports = new JsonAccount();
