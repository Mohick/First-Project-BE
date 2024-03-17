
class MainPageController {
  async home(req, res, next) {
    const {email, password} = req.session.admin
    try {
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        return res.render("home page", { nameAdmin: email });
      } else {
        // Redirect back if admin data is not found
        return res.redirect("back");
      }
    } catch (error) {
      // Pass the error to the next middleware
      next(error);
    }
  }
}

module.exports = new MainPageController();
