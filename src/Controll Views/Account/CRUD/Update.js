const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class UpdateAcount {
  async update(req, res, next) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (
        req.body.username.trim().length > 6 &&
        regex.test(req.body.email) &&
        req.body.password.trim().length > 6 &&
        req.body.password.trim().length !== req.body.email
      ) {
        await SchemaAccount.find({ email: req.body.email }).then((data) => {
          if (!!data) {
            const formAccount = req.body;
            const formatData = new SchemaAccount(formAccount);
            formatData.save();
            return res.redirect("back");
          } else {
            return res.send("<h1>Please Don't Hack My Projects !</h1> ");
          }
        });
      } else {
        return res.send("<h1>Please Don't Hack My Projects !</h1>");
      }
    } catch (next) {
      return next();
    }
  }
}

module.exports = new UpdateAcount();
