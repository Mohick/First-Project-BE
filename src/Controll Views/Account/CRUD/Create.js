const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class CreateAccount {
  async create(req, res, next) {
    try {
      // Regular expression to validate email format
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const { email: adminEmail, password: adminPassword } = req.session.admin;

      // Check if the user is logged in as admin
      if (
        process.env.emailAdmin === adminEmail &&
        process.env.passwordAdmin === adminPassword
      ) {
        const { username, email, password } = req.body;

        // Checking if username, email, and password meet the required criteria
        if (
          username.trim().length > 6 &&
          regex.test(email) &&
          password.trim().length >= 8 &&
          password.trim() !== email
        ) {
          // Checking if the email is already associated with an existing account
          const existingAccount = await SchemaAccount.findOne({ email: email });

          if (!existingAccount) {
            // Saving the account information to the database if it's a new account
            const newAccount = new SchemaAccount(req.body);
            await newAccount.save();

            // Returning success message if the account is created successfully
            return res.redirect("back");

          } else {
            // Redirecting back if the email is already in use
            return res.redirect("back");
          }
        } else {
          // Redirecting back if the input data doesn't meet the required criteria
          return res.redirect("back");
        }
      } else {
        // Redirecting back if the credentials don't match
        return res.redirect("back");
      }
    } catch (error) {
      // Handling errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new CreateAccount();
