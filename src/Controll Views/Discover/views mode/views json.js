const DataUser = require("../../../Schema/SchemaDiscover/Schema");

class JsonAccount {
  async json(req, res) {
    await DataUser.find({})
    .then((resultData) => {
      resultData = resultData.map((data) => data.toObject());
      res.json(resultData);
    });
  }
}


module.exports = new JsonAccount();