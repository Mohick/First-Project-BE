const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class UpdateAcount {
  async viewUpdate(req, res, next) {
    try {
      if (req.session.admin) {
        Promise.all([
          SchemaAccount.find({}),
          SchemaAccount.findById({ _id: req.params.id }),
          Admin.findOne({ _id: req.session.admin._id }),
        ]).then(([allAccountUsers, user, admin]) => {
          if (!!user && !!admin) {
            const nameAdmin = admin.toObject().username;
            const singleUser = user.toObject();
            console.log(user);
            const allUsers = allAccountUsers.filter((data) => {
              data = data.toObject();
              return data.email !== singleUser.email;
            });

            res.render("Account/Views mode/views form update", {
              allUsers: JSON.stringify(allUsers),
              singleUser: singleUser,
              nameAdmin: nameAdmin,
            });
          } else {
            res.redirect("/login/");
          }
        });
      } else {
        res.redirect("/login/");
      }
    } catch (next) {
      return next;
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
