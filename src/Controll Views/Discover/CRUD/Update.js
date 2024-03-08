const path = require("path");
const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");
const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

const fs = require("fs");
const session = require("express-session");
class UpdateDiscover {
  async viewUpdate(req, res, next) {
    try {
      if (!!req.session.admin) {
        Promise.all([
          Admin.findOne({ _id: req.session.admin._id }),
          SchemaDiscover.findById({ _id: req.params.id }),
        ]).then(([admin, discover]) => {
          if (!!admin) {
            const nameAdmin = admin.toObject().username;
            const resultData = discover.toObject();
            return res.render("Discover/Views mode/views form update", {
              nameAdmin,
              resultData: resultData,
            });
          } else {
            return res.redirect("/login/");
          }
        });
      } else {
        return res.redirect("/login/");
      }
    } catch (next) {
      return next;
    }
  }
  async update(req, res, next) {
    const formAccount = req.body;
    const dataItems = await SchemaDiscover.findById({ _id: req.params.id });
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
    await SchemaDiscover.findOneAndUpdate(
      { _id: req.params.id },
      formAccount
    ).then((dataset) => {
      res.redirect("back");
    });
  }
  async restore(req, res, next) {
    await SchemaDiscover.restore({ _id: req.params.id }).then((data) => {
      return res.redirect("back");
    });
  }
  async multipleRestore(req, res, next) {
    await SchemaDiscover.restore({ _id: { $in: req.body.id } }).then((data) => {
      return res.redirect("back");
    });
  }

  async updateLike(req, res, next) {
    try {
      const formAccount = req.body;
      Promise.all([SchemaAccount.find({ _id: req.session.user._id }),SchemaDiscover.findOne({ _id: req.body._id })]) 
      .then(([account,item]) => {
        if (!!account) {
      if (
        item.imageMusical == formAccount.imageMusical &&
        item.titleMusical == formAccount.titleMusical &&
        item.audioMusical == formAccount.audioMusical &&
        item.nameSinger == formAccount.nameSinger
      ) {
        updateItem()
      } else {
        res.redirect("/");
      }
    }else {
    res.redirect("/");
   }
      })
    
      function updateItem() {
        SchemaDiscover.findOneAndUpdate(
          { _id: req.body._id },
          formAccount
        ).then(() => {
          res.json({ message: "success" });
        });
      }
      
    } catch (error) {
      
    }
  }
}

module.exports = new UpdateDiscover();
