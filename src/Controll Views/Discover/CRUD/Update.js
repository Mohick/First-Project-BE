const path = require("path");
const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");
const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");
const fs = require("fs");

class UpdateDiscover {
  async viewUpdate(req, res, next) {
    try {
      // Checking if the admin is logged in
      if (!!req.session.admin) {
        // Finding admin by ID and discovering data by ID
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          SchemaDiscover.findById({ _id: req.params.id }),
        ]).then(([admin, discover]) => {
          if (!!admin) {
            // Rendering the form for updating data
            const nameAdmin = admin.toObject().username;
            const resultData = discover.toObject();
            return res.render("Discover/Views mode/views form update", {
              nameAdmin,
              resultData: resultData,
            });
          } else {
            return res.redirect("back");
          }
        });
      } else {
        return res.redirect("back");
      }
    } catch (next) {
      return next;
    }
  }

  async update(req, res, next) {
    const formAccount = req.body;
    // Finding data items by ID
    const dataItems = await SchemaDiscover.findById({ _id: req.params.id });

    // Updating image and audio URLs
    formAccount.imageMusical =
      req.protocol +
      "://" +
      req.rawHeaders[1] +
      "/img/" +
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
        __filename,
        `../../../../../public${dataItems.imageMusical.slice(
          (req.protocol + "://" + req.rawHeaders[1]).length,
          formAccount.imageMusical.length
        )}`
      )
    );

    fs.unlinkSync(
      path.join(
        __filename,
        `../../../../../public${dataItems.audioMusical.slice(
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
  }

  async restore(req, res, next) {
    // Restoring a single data item
    await SchemaDiscover.restore({ _id: req.params.id }).then((data) => {
      return res.redirect("back");
    });
  }

  async multipleRestore(req, res, next) {
    // Restoring multiple data items
    await SchemaDiscover.restore({ _id: { $in: req.body.id } }).then((data) => {
      return res.redirect("back");
    });
  }
}

module.exports = new UpdateDiscover();
