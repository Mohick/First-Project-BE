const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");
const fs = require("fs");
const path = require("path");

class DeleteDiscover {
  // Soft delete a single discover entry
  async softDelete(req, res, next) {
    try {
      const { email, password } = req.session.admin;

      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Soft delete the discover entry by ID
        await SchemaDiscover.delete({ _id: req.params.id }).then((data) => {
          return res.redirect("back");
        });
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      // return next(error); //only use when development 
        return res.redirect("back");
    }
  }

  // Delete multiple discover entries
  async multipleDestroy(req, res, next) {
    try {
      // Determine the directory path
      const directoryPath = path.join(__dirname, '../../../../public');

      // Find and delete multiple discover entries by IDs
      const { email, password } = req.session.admin;

      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        const items = await SchemaDiscover.findDeleted({
          _id: { $in: req.body.id },
        });

        // Iterate through the items and delete associated files
        for (const item of items) {
          fs.unlinkSync(path.join(directoryPath, item.imageMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length)));
          fs.unlinkSync(path.join(directoryPath, item.audioMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length)));
        }

        // Remove the discover entries from the database
        await SchemaDiscover.remove({ _id: { $in: req.body.id } }).then(
          (data) => {
            return res.redirect("back");
          }
        );
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      // return next(error); //only use when development 
        return res.redirect("back");
    }
  }

  // Delete a single discover entry
  async destroy(req, res, next) {
    try {
      const { email, password } = req.session.admin;
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Find and delete a single discover entry by ID
        const items = await SchemaDiscover.findDeleted({
          _id: req.body.id[0].trim(),
        });
        const directoryPath = path.join(__dirname, '../../../../public');
        fs.unlinkSync(path.join(directoryPath, items[0].imageMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length)));
        fs.unlinkSync(path.join(directoryPath, items[0].audioMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length)));
        await SchemaDiscover.remove({ _id: req.body.id[0].trim() }).then(
          (data) => {
            return res.redirect("back");
          }
        );
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      // return next(error); //only use when development 
        return res.redirect("back");
    }
  }
}

module.exports = new DeleteDiscover();
