const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");

class CreateDiscover {
  async create(req, res, next) {
    try {
      const formAccount = req.body;
      formAccount.imageMusical =req.protocol+"://" + req.rawHeaders[1] + "/img/" + req.files.imageMusical[0].filename;
      formAccount.audioMusical =req.protocol+"://" + req.rawHeaders[1] + "/audio/" + req.files.audioMusical[0].filename;
      const editData = new SchemaDiscover(formAccount);
      editData.save();
      res.redirect("back");
    } catch (next) {
      return next;
    }
  }
}

module.exports = new CreateDiscover();
