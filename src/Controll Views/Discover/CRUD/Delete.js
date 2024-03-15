
const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");
const fs = require("fs");
const path = require("path");

class DeleteDiscover {
  // Soft delete a single discover entry
  async softDelete(req, res, next) {
    try {
      // Delete the discover entry by ID
      await SchemaDiscover.deleteOne({ _id: req.params.id }).then((data) => {
        return res.redirect("back");
      });
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  // Delete multiple discover entries
  async multipleDestroy(req, res, next) {
    try {
      // Find and delete multiple discover entries by IDs
      const items = await SchemaDiscover.findDeleted({ _id: { $in: req.body.id } });
      
      // Iterate through the items and delete associated files
      for (let i = 0; i < items.length; i++) {
        fs.unlinkSync(path.join(__dirname, `../../../../../public${items[i].imageMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length, items[i].imageMusical.length)}`));
        fs.unlinkSync(path.join(__dirname, `../../../../../public${items[i].audioMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length, items[i].audioMusical.length)}`));
      }

      // Remove the discover entries from the database
      await SchemaDiscover.remove({ _id: { $in: req.body.id } }).then((data) => {
        return res.redirect("back");
      });
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  // Delete a single discover entry
  async destroy(req, res, next) {
    try {
      // Find and delete a single discover entry by ID
      const items = await SchemaDiscover.findDeleted({ _id: req.body.id[0].trim() });
      fs.unlinkSync(path.join(__dirname, `../../../../../public${items[0].imageMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length, items[0].imageMusical.length)}`));
      fs.unlinkSync(path.join(__dirname, `../../../../../public${items[0].audioMusical.slice((req.protocol + "://" + req.rawHeaders[1]).length, items[0].audioMusical.length)}`));
      await SchemaDiscover.remove({ _id: req.body.id[0].trim() }).then((data) => {
        return res.redirect("back");
      });
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }
}

module.exports = new DeleteDiscover();
