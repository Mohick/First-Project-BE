const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class DeleteAccount {
  async softDelete(req, res, next) {
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      // Soft delete the account based on the provided ID
      await SchemaAccount.delete({ _id: req.params.id }).then((data) => {
        // Redirect back after successful soft deletion
        return res.redirect("back");
      });
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async multipleDestroy(req, res, next) {
    try {
      // Delete multiple accounts based on the provided IDs
      await SchemaAccount.deleteMany({ _id: { $in: req.body.id } }).then((data) => {
        // Redirect back after successful deletion
        return res.redirect("back");
      });
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      // Delete a single account based on the provided ID
      await SchemaAccount.deleteOne({ _id: req.body.id[0].trim() }).then((data) => {
        // Redirect back after successful deletion
        return res.redirect("back");
      });
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}


module.exports = new DeleteAccount();
