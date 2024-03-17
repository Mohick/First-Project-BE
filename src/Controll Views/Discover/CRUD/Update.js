// Import necessary modules
const path = require("path"); // Importing path module for handling file paths
const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema"); // Importing SchemaDiscover model
const fs = require("fs"); // Importing file system module

class UpdateDiscover {
  async viewUpdate(req, res, next) {
    const { email, password } = req.session.admin;
    try {
      // Checking if the admin is logged in
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Finding a discover data item by ID
        SchemaDiscover.findById({ _id: req.params.id }).then((discover) => {
          // Rendering the form for updating data
          const resultData = discover.toObject();
          return res.render("Discover/Views mode/views form update", {
            nameAdmin: email,
            resultData: resultData,
          });
        });
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      // Handle any errors that might occur
      return next(error);
    }
  }

  async update(req, res, next) {
    const { email, password } = req.session.admin;

    if (
      process.env.emailAdmin === email &&
      process.env.passwordAdmin === password
    ) {
      const formAccount = req.body;
      const dataItems = await SchemaDiscover.findById({ _id: req.params.id });

      // Constructing image and audio URLs
      formAccount.imageMusical =
        req.protocol +
        "://" +
        req.rawHeaders[1] +
        "/image/" +
        req.files.imageMusical[0].filename;
      formAccount.audioMusical =
        req.protocol +
        "://" +
        req.rawHeaders[1] +
        "/audio/" +
        req.files.audioMusical[0].filename;

      // Deleting previous image and audio files
      fs.unlinkSync(
        path.join(
          __dirname, // Corrected __filename to __dirname
          `../../../../public${dataItems.imageMusical.slice(
            (req.protocol + "://" + req.rawHeaders[1]).length,
            formAccount.imageMusical.length
          )}`
        )
      );

      fs.unlinkSync(
        path.join(
          __dirname, // Corrected __filename to __dirname
          `../../../../public${dataItems.audioMusical.slice(
            (req.protocol + "://" + req.rawHeaders[1]).length,
            formAccount.audioMusical.length
          )}`
        )
      );

      // Updating the data item
      await SchemaDiscover.findOneAndUpdate(
        { _id: req.params.id },
        formAccount
      ).then((dataset) => {
        res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  }

  async restore(req, res, next) {
    // Restoring a single data item
    const { email, password } = req.session.admin;

    if (
      process.env.emailAdmin === email &&
      process.env.passwordAdmin === password
    ) {
      await SchemaDiscover.restore({ _id: req.params.id }).then((data) => {
        return res.redirect("back");
      });
    } else {
      return res.redirect("back");
    }
  }

  async multipleRestore(req, res, next) {
    const { email, password } = req.session.admin;

    if (
      process.env.emailAdmin === email &&
      process.env.passwordAdmin === password
    ) {
      await SchemaDiscover.restore({ _id: { $in: req.body.id } }).then(
        (data) => {
          return res.redirect("back");
        }
      );
    } else {
      return res.redirect("back");
    }
  }
}

module.exports = new UpdateDiscover();
