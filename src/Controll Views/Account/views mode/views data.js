const DataUser = require("../../../Schema/SchemaAccount/Schema");

class ViewsData {
  async views(req, res, next) {
    try {
      await DataUser.find({}).then((resultData) => {
        resultData = resultData.map((data) => {
          return data.toObject();
        });

        res.render("./Account/views mode/views data", {
          resultData: JSON.stringify(resultData),
        });
      });
    } catch (next) {
      return next();
    }
  }
}

module.exports = new ViewsData();
