const { log } = require("console");
const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");
const fs = require("fs")
const path = require("path")
class DeleteDiscover {
  async softDelete(req, res, next) {
    try {
      await SchemaDiscover.delete({ _id: req.params.id }).then((data) => {
        return res.redirect("back");
      });
    } catch (next) {
      return next();
    }
  }
  async multipleDestroy(req, res, next) {
    const items= await SchemaDiscover.findDeleted({ _id: { $in: req.body.id } })
  
    for( let i = 0; i < items.length; i++ ) {
      fs.unlinkSync(path.join(__filename,`../../../../../public${items[i].imageMusical.slice((req.protocol+"://" + req.rawHeaders[1]).length,items[i].imageMusical.length)}`))
      fs.unlinkSync(path.join(__filename,`../../../../../public${items[i].audioMusical.slice((req.protocol+"://" + req.rawHeaders[1]).length,items[i].audioMusical.length)}`))

    }
    await SchemaDiscover.remove({ _id: { $in: req.body.id } }).then((data) => {
      return res.redirect("back");
    });
  }
  async destroy(req, res, next) {
  const items= await SchemaDiscover.findDeleted({ _id: req.body.id[0].trim() }) 
  fs.unlinkSync(path.join(__filename,`../../../../../public${items[0].imageMusical.slice((req.protocol+"://" + req.rawHeaders[1]).length,items[0].imageMusical.length)}`))
  fs.unlinkSync(path.join(__filename,`../../../../../public${items[0].audioMusical.slice((req.protocol+"://" + req.rawHeaders[1]).length,items[0].audioMusical.length)}`))
    await SchemaDiscover.remove({ _id: req.body.id[0].trim() }).then((data) => {
      return res.redirect("back");
    });
  }
}

module.exports = new DeleteDiscover();
