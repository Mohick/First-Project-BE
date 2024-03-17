

class AuthenTionAdmin {
  async AuthenTionAdmin(req, res, next) {
    const {email, password} =  req.body
    
    try {
      // Find admin and session data
      // Check if admin exists and credentials match
      if (process.env.emailAdmin == email && process.env.passwordAdmin == password) {
        // Store admin data in session
        req.session.admin = req.body;
        res.redirect("/");
      } else {
        // Redirect back if admin doesn't exist or credentials don't match
        res.redirect("back");
      }
    } catch (error) {
      // Handle errors
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new AuthenTionAdmin();
