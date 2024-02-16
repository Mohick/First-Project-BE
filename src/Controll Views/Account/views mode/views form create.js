const DataUser = require("../../../Schema/SchemaAccount/Schema");

class ViewsFormCreated {
  async views(req, res, next) {
    try {
      await DataUser.find({}).then((resultData) => {
        resultData = resultData.map((data) => data.toObject());
        res.render("./Account/views mode/views form create", {resultData:JSON.stringify(resultData)});
      });
    } catch (next) {
      return next();
    }
  }
}

module.exports = new ViewsFormCreated();
