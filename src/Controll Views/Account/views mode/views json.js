const DataUser = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class JsonAccount {
  async json(req, res) {
    req.session.a="ádadasdsad"
    if (!!req.session.admin) {
      Promise.all([
        Admin.findOne({ _id: req.session.admin._id }),
        DataUser.find({}),
      ]).then(([admin, resultData]) => {
        if (!!admin) {
          resultData = resultData.map((data) => data.toObject());
          res.json(resultData);
        } else {
          res.redirect("back");
        }
      });
    } else {
      res.redirect("back");
    }
  }
  async sessionDataAccount(req, res) {
    
  //  res.json(req.session)
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', true);
    
    await DataUser.findOne({
      email: req.session.email,
      password: req.session.password,
    }).then((resultData) => {
      if (!!resultData) {
        const sessionCookies = (req.session.account = resultData.toObject());
        res.json(sessionCookies);
      } else {
        res.json({ message: "Error" });
      }
    });
  }
  async returnUnusedEmail(req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', true);
      
    await DataUser.find({ email: req.params.email }).then((resultData) => {
      if (!!resultData) {
        res.json({ result: 1 });
      } else {
        res.json({ result: 0 });
      }
    });
  }
}

module.exports = new JsonAccount();
