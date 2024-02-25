const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class DeleteAcount {
  async softDelete(req, res, next) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      await SchemaAccount.delete({ _id: req.params.id }).then((data) => {
        return res.redirect("back");
      });
    } catch (next) {
      return next();
    }
  }
  async multipleDestroy(req, res, next) {
    await SchemaAccount.remove({ _id: { $in: req.body.id } }).then((data) => {
      return res.redirect("back");
    });
  }
  async destroy(req, res, next) {
    await SchemaAccount.remove({ _id: req.body.id[0].trim() }).then((data) => {
      return res.redirect("back");
    });
  }
}

module.exports = new DeleteAcount();
