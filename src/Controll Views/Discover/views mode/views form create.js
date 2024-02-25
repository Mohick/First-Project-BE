const DataUser = require("../../../Schema/SchemaDiscover/Schema");

class ViewsFormCreated {
  async views(req, res, next) {
    try {
      res.render("./Discover/views mode/views form create");
    } catch (next) {
      return next();
    }
  }
}

module.exports = new ViewsFormCreated();
