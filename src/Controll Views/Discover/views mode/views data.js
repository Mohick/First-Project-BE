const Discover = require("../../../Schema/SchemaDiscover/Schema");

class ViewsData {
  async views(req, res, next) {
    try {
      await Discover.find({}).then((resultData) => {
        resultData = resultData.map((data) => {
          return data.toObject();
        });

        res.render("./Discover/views mode/views data", {
          resultData: JSON.stringify(resultData),
        });
      });
    } catch (next) {
      return next();
    }
  }
}

module.exports = new ViewsData();
