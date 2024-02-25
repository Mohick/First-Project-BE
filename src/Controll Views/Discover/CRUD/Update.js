const path = require("path");
const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");
const fs = require("fs");
class UpdateDiscover {
  async viewUpdate(req, res, next) {
    try {
      await SchemaDiscover.findById({ _id: req.params.id }).then(
        (resultData) => {
          res.render("Discover/Views mode/views form update", {
            resultData: resultData.toObject(),
          });
        }
      );
    } catch (next) {
      return next;
    }
  }
  async update(req, res, next) {
    const formAccount = req.body
    const dataItems = await SchemaDiscover.findById({ _id: req.params.id });
    formAccount.imageMusical =req.protocol+"://" + req.rawHeaders[1] + "/img/" + req.files.imageMusical[0].filename;
    formAccount.audioMusical =req.protocol+"://" + req.rawHeaders[1] + "/audio/" + req.files.audioMusical[0].filename;
    fs.unlinkSync(path.join(__filename,`../../../../../public${dataItems.imageMusical.slice((req.protocol+"://" + req.rawHeaders[1]).length,formAccount.imageMusical.length)}`))
    fs.unlinkSync(path.join(__filename,`../../../../../public${dataItems.audioMusical.slice((req.protocol+"://" + req.rawHeaders[1]).length,formAccount.audioMusical.length)}`))
    await SchemaDiscover.findOneAndUpdate({ _id: req.params.id },formAccount)
   .then( dataset => {
    res.redirect('back')
   })
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
}

module.exports = new UpdateDiscover();
