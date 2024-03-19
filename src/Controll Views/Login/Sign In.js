const Admin = require("../../Schema/SchemaAdmin/Admin");

class AdminAccountController {
  async views(req, res, next) {
    try {
      res.render("./form login/view sign in");
    } catch (error) {
      // Handle any errors that occur during rendering
      console.error("Error rendering admin login view:", error);
      // Pass the error to the next middleware
      // return next(error); //only use when development 
      return res.redirect("back");
    }
  }
}

module.exports = new AdminAccountController();
