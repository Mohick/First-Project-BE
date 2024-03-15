const Admin = require("../../Schema/SchemaAdmin/Admin");

class AuthenTionAdmin {
  async AuthenTionAdmin(req, res, next) {
    const {email, password} =  req.body
    try {
      // Find admin and session data
      const [admin, session] = await Promise.all([
        Admin.findOne({ email: email }),
      ]);

      // Check if admin exists and credentials match
      if (admin && admin.email === email && admin.password === password) {
        // Store admin data in session
        req.session.admin = admin;
        res.redirect("/");
      } else {
        // Redirect back if admin doesn't exist or credentials don't match
        res.redirect("back");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new AuthenTionAdmin();
