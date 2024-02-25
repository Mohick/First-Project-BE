const DataUser = require("../../../Schema/SchemaDiscover/Schema");

class viewsTrash {
  async views(req, res, next) {
    try {
      await DataUser.findDeleted()
      .then((resultData) => {
        resultData = resultData.map((data) => {
          return data.toObject();
        });
        
        res.render("./Discover/views mode/views trash", {
          resultData: JSON.stringify(resultData),
        });
      });
    } catch (next) {
      return next();
    }
  }
}

module.exports = new viewsTrash();
