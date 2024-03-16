const SchemaAccount = require("../../../Schema/SchemaAccount/Schema");

class SessionAccountClient {
  // Retrieves session data for the logged-in account
  async autoLogin(req, res) {
    try {
      if (!!req.session.account) {
        // Find the account based on email and password stored in session
        await SchemaAccount.findOne({
          email: req.session.account.email,
          password: req.session.account.password,
        }).then((resultData) => {
          if (!!resultData) {
            res.json(resultData);
          } else {
            res.json({ message: "Error" });
          }
        });
      } else {
        res.json({ message: "Error" });
      }
    } catch (error) {
      res.json({ message: "Error" });
    }
  }

  // Logs in the account with provided email and password
  async loginAccount(req, res) {
    try {
      const { email, password } = req.body;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(email) && !!password) {
        // Find the account based on provided email and password
        
       
      await  SchemaAccount.find({
          email: (""+email).trim(),
          password: (""+password).trim()
        }).then((resultData) => {
          if (!!resultData) {
            // Set session data for the logged-in account
          req.session.account = {
              email: email,
              password: password,
            } 
           console.log(req.session.account);
            res.json(req.session.account);
          } else {
            console.log(3);
            res.json({ message: "Error" });
          }
        });
      } else {
        res.json({ message: "Error" });
      }
    } catch (error) {
      console.log(error);
      res.json({ message: "Error" });
    }
  }

  // Checks if an email is unused
  async returnUnusedEmail(req, res) {
    try {
      // Find accounts with the provided email
      await SchemaAccount.find({ email: req.params.email }).then(
        (resultData) => {
          // Respond with result indicating whether the email is unused
          if (!!resultData.length) {
            return res.json({ result: 1 });
          } else {
            return res.json({ result: 0 });
          }
        }
      );
    } catch (error) {
      res.json({ message: "Error" });
    }
  }
  
  async checkEmailBeforeUpdateAtClient(req, res, next) {
    const { id, email } = req.query;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check input
    if (regex.test(email) && !!id) {
      try {
        // Handle async when querying data from MongoDB
        Promise.all([
          await SchemaAccount.find({}),
          await SchemaAccount.find({ _id: id }),
        ]).then(([allAccount, userAccount]) => {
          // Check if user account exists
          if (userAccount.length > 0) {
            // Get the current email as a string
            const currentEmail = ("" + email).trim();
            // Check if the current email matches the email of the user account
            if (userAccount[0].email == currentEmail) {
              res.json({ email: "true" });
            } else {
              // Check if the new email exists in other accounts
              const newEmail = allAccount.filter((data) => {
                return data.email == currentEmail;
              });
              // If the new email matches an email in other accounts, return false
              if (newEmail.length > 0) {
                res.json({ email: "false" });
              } else {
                res.json({ email: "true" });
              }
            }
          } else {
            res.json({ email: "false" });
          }
        });
      } catch (error) {
        res.json({ email: "false" });
      }
    } else {
      res.json({ email: "false" });
    }
  }
}

module.exports = new SessionAccountClient();
