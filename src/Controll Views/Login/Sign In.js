const Admin = require("../../Schema/SchemaAdmin/Admin");

class AdminAccuount {
  async views(req, res, next) {
    try {
      res.render("./form login/view sign in")
    } catch (error) {}
  }
}

module.exports = new AdminAccuount();
