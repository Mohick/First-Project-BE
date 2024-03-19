class HomePageDiscover {
  async chooseMode(req, res, next) {
    try {
      // Extract email and password from admin session
      const { email, password } = req.session.admin;

      // Check if the session corresponds to an admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Render the homepage for choosing a mode
        return res.render("./Discover/choose mode", {
          nameAdmin: email, // Pass the admin's email to the view
        });
      } else {
        // Redirect to the homepage if admin session doesn't exist
        return res.redirect("/");
      }
    } catch (error) {
      // Pass any errors to the next middleware
       // return next(error); //only use when development 
       return res.redirect("back");
    }
  }
}

module.exports = new HomePageDiscover();
