const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class JsonAccount {
  // Returns JSON data for accounts if admin session exists
  async json(req, res) {
    try {
      const { email, password } = req.session.admin;

      // Check if an admin session exists
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Find all accounts
        const accounts = await SchemaAccount.find({});

        // Convert account data to plain objects
        const accountData = accounts.map((data) => data.toObject());

        // Send JSON response
        res.json(accountData);
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
