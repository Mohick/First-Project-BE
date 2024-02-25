const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class UpdateAcount {
  async viewUpdate(req, res, next) {
    try {
      const user = SchemaAccount.findById({ _id: req.params.id }).then(
        (resultData) => {
          return resultData;
        }
      );

      const allAccountUsers = SchemaAccount.find({}).then((resultData) => {
        return resultData;
      });

      Promise.all([allAccountUsers, user]).then(([allAccountUsers, user]) => {
        if (!!user) {
          const singleUser = user.toObject();
          const allUsers = allAccountUsers.filter((data) => {
            data = data.toObject();
            return data.email !== singleUser.email;
          });

          res.render("Account/Views mode/views form update", {
            allUsers: JSON.stringify(allUsers),
            singleUser: singleUser,
          });
        } else {
          return res.send("<h1>Please Don't Hack My Projects!</h1> ");
        }
      });
    } catch (next) {
      return next();
    }
  }
  async update(req, res, next) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (
        req.body.username.trim().length > 6 &&
        regex.test(req.body.email) &&
        req.body.password.trim().length > 6 &&
        req.body.password.trim().length !== req.body.email
      ) {
        console.log(req.body);

        await SchemaAccount.updateOne({ _id: req.params.id }, req.body).then(
          (data) => {
            if (!!data) {
              return res.redirect("back");
            } else {
              return res.send("<h1>Please Don't Hack My Projects!</h1> ");
            }
          }
        );
      }
    } catch (next) {
      return next;
    }
  }
  async restore(req, res, next) {
    await SchemaAccount.restore({ _id: req.params.id }).then((data) => {
      return res.redirect("back");
    });
  }
  async multipleRestore(req, res, next) {
    await SchemaAccount.restore({ _id: { $in: req.body.id } }).then((data) => {
      return res.redirect("back");
    });
  }
}

module.exports = new UpdateAcount();
