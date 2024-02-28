const DataUser = require("../../../Schema/SchemaAccount/Schema");

class JsonAccount {
  async json(req, res) {
    await DataUser.find({}).then((resultData) => {
      resultData = resultData.map((data) => data.toObject());
      res.json(resultData);
    });
  }
  async sessionDataAccount(req, res) {
    await DataUser.findOne({ _id: req.params.id }).then((resultData) => {
      if (!!resultData) {
        const sessionCookies = (req.session.account = resultData.toObject())
        res.json(sessionCookies);
      } 
    });
  }
}

module.exports = new JsonAccount();
