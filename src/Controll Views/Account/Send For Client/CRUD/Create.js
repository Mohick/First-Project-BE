const SchemaAccount = require("../../../../Schema/SchemaAccount/Schema");

class CreateAccountClient {
  async create(req, res, next) {
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      const { username, email, password } = req.body;

      // Check if input data meets the required criteria
      if (
        username.trim().length > 6 &&
        regex.test(email) &&
        password.trim().length >= 8 &&
        password.trim() !== email
      ) {
        // Check if an account with the provided email already exists
        const existingAccount = await SchemaAccount.findOne({ email: email });

        // If the account does not exist, proceed with creating a new account
        if (!existingAccount) {
          // Save the new account data
          const formatData = new SchemaAccount(req.body);
          await formatData.save();

          // Create session for the new account
          req.session.account = {
            email: email,
            password: password,
          };
          // Return success message if the account is created successfully
          return res.json({ message: "success" });
        } else {
          // Redirect back if an account with the provided email already exists
          return res.redirect("back");
        }
      } else {
        // Redirect back if input data does not meet the required criteria
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new CreateAccountClient();
