const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");

class CreateDiscover {
  // Create a new discover entry
  async create(req, res, next) {
    try {
      // Extract form data from request
      const formAccount = req.body;
      // Construct image and audio URLs using protocol and request headers
      formAccount.imageMusical = req.protocol + "://" + req.rawHeaders[1] + "/img/" + req.files.imageMusical[0].filename;
      formAccount.audioMusical = req.protocol + "://" + req.rawHeaders[1] + "/audio/" + req.files.audioMusical[0].filename;
      // Create a new instance of SchemaDiscover with form data
      const editData = new SchemaDiscover(formAccount);
      // Save the new entry to the database
      await editData.save();
      // Redirect back to the previous page
      res.redirect("back");
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new CreateDiscover();
