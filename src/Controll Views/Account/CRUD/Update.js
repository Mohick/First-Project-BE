const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");
const Admin = require("../../../Schema/SchemaAdmin/Admin");

class UpdateAccount {
  async viewUpdate(req, res, next) {
    try {
      const { email, password } = req.session.admin;

      // Check if the user is logged in as admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Fetch all account users and the user to be updated
        const [allAccountUsers, user] = await Promise.all([
          SchemaAccount.find({}),
          SchemaAccount.findById(req.params.id),
        ]);

        // Check if the user exists
        if (!!user) {
          // Extract admin's username and user's data
          const singleUser = user.toObject();

          // Filter out the user being updated from the list of all users
          const allUsers = allAccountUsers.filter((data) => {
            data = data.toObject();
            return data.email !== singleUser.email;
          });

          // Render the view for updating the account
          return res.render("Account/Views mode/views form update", {
            allUsers: JSON.stringify(allUsers),
            singleUser: singleUser,
            nameAdmin: email,
          });
        } else {
          // Redirect to login page if user or admin not found
          return res.redirect("/login/");
        }
      } else {
        // Redirect to login page if user is not logged in as admin
        return res.redirect("/login/");
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
      const { email, password } = req.session.admin;

      // Check if the user is logged in as admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        // Validate the provided data for updating the account
        if (
          req.body.username.trim().length > 6 &&
          regex.test(req.body.email) &&
          req.body.password.trim().length >= 8 &&
          req.body.password.trim() !== req.body.email
        ) {
          // Update the account based on the provided ID
          const data = await SchemaAccount.updateOne(
            { _id: req.body._id },
            req.body
          );

          // Check if the update was successful
          if (!!data) {
            // Redirect back after successful update
            return res.redirect("back");
          } else {
            // Redirect back if update failed
            return res.redirect("back");
          }
        } else {
          // Redirect back if provided data does not meet criteria
          return res.redirect("back");
        }
      } else {
        // Redirect to login page if user is not logged in as admin
        return res.redirect("/login/");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
      return next(error);
    }
  }

  async restore(req, res, next) {
    // Restore a single account based on the provided ID
    const { email, password } = req.session.admin;

    // Check if the user is logged in as admin
    if (
      process.env.emailAdmin === email &&
      process.env.passwordAdmin === password
    ) {
      await SchemaAccount.restore({ _id: req.params.id });

      // Redirect back after successful restoration
      return res.redirect("back");
    } else {
      // Redirect to login page if user is not logged in as admin
      return res.redirect("/login/");
    }
  }

  async multipleRestore(req, res, next) {
    // Restore multiple accounts based on the provided IDs
    const { email, password } = req.session.admin;

    // Check if the user is logged in as admin
    if (
      process.env.emailAdmin === email &&
      process.env.passwordAdmin === password
    ) {
      await SchemaAccount.restore({ _id: { $in: req.body.id } });

      // Redirect back after successful restoration
      return res.redirect("back");
    } else {
      // Redirect to login page if user is not logged in as admin
      return res.redirect("/login/");
    }
  }
}

module.exports = new UpdateAccount();
