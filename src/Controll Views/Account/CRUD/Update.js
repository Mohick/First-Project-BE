
const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class UpdateAccount {
  async viewUpdate(req, res, next) {
    try {
      // Check if the user is an admin
      if (req.session.admin) {
        // Fetch all account users, the user to be updated, and the admin
        Promise.all([
          SchemaAccount.find({}),
          SchemaAccount.findById(req.params.id),
          Admin.findOne({ _id: req.session.admin._id }),
        ]).then(([allAccountUsers, user, admin]) => {
          if (!!user && !!admin) {
            // Extract admin's username and user's data
            const nameAdmin = admin.toObject().username;
            const singleUser = user.toObject();

            // Filter out the user being updated from the list of all users
            const allUsers = allAccountUsers.filter((data) => {
              data = data.toObject();
              return data.email !== singleUser.email;
            });

            // Render the view for updating the account
            res.render("Account/Views mode/views form update", {
              allUsers: JSON.stringify(allUsers),
              singleUser: singleUser,
              nameAdmin: nameAdmin,
            });
          } else {
            // Redirect to login page if user or admin not found
            res.redirect("/login/");
          }
        });
      } else {
        // Redirect to login page if user is not logged in as admin
        res.redirect("/login/");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async update(req, res, next) {
    // Regular expression to validate email format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      // Check if the provided data meets the required criteria for updating
      if (
        req.body.username.trim().length > 6 &&
        regex.test(req.body.email) &&
        req.body.password.trim().length > 6 &&
        req.body.password.trim() !== req.body.email
      ) {
        // Update the account based on the provided ID
        await SchemaAccount.updateOne({ _id: req.body._id }, req.body).then(
          (data) => {
            if (!!data) {
              // Redirect back after successful update
              return res.redirect("back");
            } else {
              // Redirect back if update failed
              return res.redirect("back");
            }
          }
        );
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async restore(req, res, next) {
    // Restore a single account based on the provided ID
    await SchemaAccount.restore({ _id: req.params.id }).then((data) => {
      // Redirect back after successful restoration
      return res.redirect("back");
    });
  }

  async multipleRestore(req, res, next) {
    // Restore multiple accounts based on the provided IDs
    await SchemaAccount.restore({ _id: { $in: req.body.id } }).then((data) => {
      // Redirect back after successful restoration
      return res.redirect("back");
    });
  }
}


module.exports = new UpdateAccount();
