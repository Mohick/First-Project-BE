
const SchemaDiscover = require("../../../../Schema/SchemaDiscover/Schema");
const SchemaAccount = require("../../../../Schema/SchemaAccount/Schema");

class UpdateDiscoverClient {
  // Update like for a discover item
  async updateLike(req, res, next) {
    try {
      const formAccount = req.body;

      // Fetch account and discover item data
      const [account, item] = await Promise.all([
        SchemaAccount.find({ _id: formAccount.iduser }),
        SchemaDiscover.findOne({ _id: req.body._id }),
      ]);

      if (!!account) {
        // Check if the item data matches the form data
        if (
          item.imageMusical == formAccount.imageMusical &&
          item.titleMusical == formAccount.titleMusical &&
          item.audioMusical == formAccount.audioMusical &&
          item.nameSinger == formAccount.nameSinger
        ) {
          // If the data matches, update the item
          delete formAccount.iduser;
          await updateItem(formAccount);
        } else {
          // Redirect if data does not match
          res.redirect("/");
        }
      } else {
        // Redirect if account is not found
        res.redirect("/");
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      return error;
    }
  }

  // Function to update the discover item
  async updateItem(formAccount) {
    try {
      await SchemaDiscover.findOneAndUpdate(
        { _id: req.body._id },
        formAccount
      );
      res.json({ message: "success" });
    } catch (error) {
      return error;
    }
  }
}

module.exports = new UpdateDiscoverClient();
