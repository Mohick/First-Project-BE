const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class DeleteAccount {
  async softDelete(req, res, next) {
    try {
      // Regular expression to validate email format
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const { email, password } = req.session.admin;

      // Check if the user is logged in as admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Soft delete the account based on the provided ID
        await SchemaAccount.deleteOne({ _id: req.params.id });

        // Redirect back after successful soft deletion
        return res.redirect("back");
      } else {
        // Redirect to the previous page if user is not logged in as admin
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async multipleDestroy(req, res, next) {
    try {
      const { email, password } = req.session.admin;

      // Check if the user is logged in as admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Delete multiple accounts based on the provided IDs
        await SchemaAccount.deleteMany({ _id: { $in: req.body.id } });

        // Redirect back after successful deletion
        return res.redirect("back");
      } else {
        // Redirect to the previous page if user is not logged in as admin
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { email, password } = req.session.admin;

      // Check if the user is logged in as admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Delete a single account based on the provided ID
        await SchemaAccount.deleteOne({ _id: req.body.id[0].trim() });

        // Redirect back after successful deletion
        return res.redirect("back");
      } else {
        // Redirect to the previous page if user is not logged in as admin
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new DeleteAccount();
