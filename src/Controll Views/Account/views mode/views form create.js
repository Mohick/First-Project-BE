const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class ViewsFormCreated {
  async views(req, res, next) {
    try {
      // Check if an admin session exists
      const { email, password } = req.session.admin;

      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Find all accounts
        const accounts = await SchemaAccount.find({});

        // Convert account data to plain objects
        const accountData = accounts.map((data) => data.toObject());

        // Render the view for creating a new form
        res.render("./Account/views mode/views form create", {
          resultData: JSON.stringify(accountData),
          nameAdmin: email,
        });
      } else {
        // Redirect to login if admin session does not exist
        res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      // return next(error); //only use when development 
      return res.redirect("back");
    }
  }
}

module.exports = new ViewsFormCreated();
