
const SchemaAccount = require("../../../../Schema/SchemaAccount/Schema");

class UpdateAccountClient {
  async updateLike(req, res, next) {
    const { id, methodLike, idItem } = req.body;
    // Search for the current account using the provided ID
    const Account = await SchemaAccount.findOne({ _id: id }).then(
      (data) => data
    );
    // Check if the account exists
    switch (!!Account._id) {
      // Handle different like methods
      case (methodLike + "").toLocaleLowerCase().trim() ==
        "addlike".toLocaleLowerCase().trim():
        // Add the liked item to the account's liked array
        Account.liked.push(idItem);
        await SchemaAccount.updateOne({ _id: id }, Account).then(
          (data) => data
        );
        res.json({ message: "Update" });
        break;

      case (methodLike + "").toLocaleLowerCase().trim() ==
        "unlike".toLocaleLowerCase().trim():
        // Remove the unliked item from the account's liked array
        const newLike = Account.liked.filter(
          (idProduct) => idProduct != idItem
        );
        Account.liked = newLike;
        await SchemaAccount.updateOne({ _id: id }, Account).then(
          (data) => data
        );

        res.json({ message: "Update" });
        break;
    }
  }

  async updateAccountClient(req, res, next) {
    const currentAccount = req.body.currentAccount;
    const newAccount = req.body.newAccount;
    const { username, email, password, _id } = req.body.currentAccount;
    const { newUsername, newEmail, newPassword } = req.body.newAccount;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
      if (
        newUsername.trim().length > 6 &&
        regex.test(newEmail) &&
        newPassword.trim().length >= 8
      ) {
        // Check if the email has not changed to avoid unnecessary checks
        if (("" + newEmail).trim() == ("" + email).trim()) {
          // Check if the new password is the same as the email
          if (("" + newPassword).trim() == ("" + newEmail).trim()) {
            return res.json({ message: false });
          } else {
            // If all conditions are met, update the account
            await SchemaAccount.updateOne({ _id: _id }, newAccount);
            // Delete the current session
            delete req.session.account;
            // Create a new session
            delete newAccount._id;
            req.session.account = newAccount;
            return res.json({ message: "Success Password" });
          }
        } else {
          // Check if the new email is different from the current email
          const getEmailUser = await SchemaAccount.find({}).then((data) => {
            return data;
          });
          // Check if the new email already exists in other accounts
          const checkEmailUser = getEmailUser.filter(
            (account) => account.email.trim() == newEmail
          );
          if (checkEmailUser.length > 0) {
            return res.json({ message: false });
          } else {
            // If all conditions are met, update the account
            await SchemaAccount.updateOne({ _id: _id }, newAccount);
            // Delete the current session
            delete req.session.account;
            // Create a new session
            delete newAccount._id;
            req.session.account = newAccount;
            return res.json({ message: false });
          }
        }
      } else {
        return res.json({ message: false });
      }
    } catch (error) {
      return res.json({ message: false });
    }
  }

}

module.exports = new UpdateAccountClient();
