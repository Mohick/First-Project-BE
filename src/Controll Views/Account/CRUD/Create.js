const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class CreateAccount {
  async create(req, res, next) {
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      const { username, email, password } = req.body;

      // Checking if username, email, and password meet the required criteria
      if (
        username.trim().length > 6 &&
        regex.test(email) &&
        password.trim().length > 6 &&
        password.trim() !== email
      ) {
        // Checking if the email is already associated with an existing account
        const existingAccount = await SchemaAccount.findOne({ email: email });

        if (!existingAccount) {
          // Saving the account information to the database if it's a new account
          const formatData = new SchemaAccount(req.body);
          await formatData.save();

          // Setting session data for the new account
          req.session.account = {
            email: email,
            password: password,
          };
          // Returning success message if the account is created successfully
          return res.json({ message: "success" });
        } else {
          // Redirecting back if the email is already in use
          return res.redirect("back");
        }
      } else {
        // Redirecting back if the input data doesn't meet the required criteria
        return res.redirect("back");
      }
    } catch (error) {
      // Handling errors
      return next;
    }
  }
}

module.exports = new CreateAccount();
