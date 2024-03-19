const SchemaDiscover = require("../../../Schema/SchemaDiscover/Schema");

class CreateDiscover {
  // Create a new discover entry
  async create(req, res, next) {
    try {
      // Extract form data from request
      const { email, password } = req.session.admin;

      // Check if the user is an admin
      if (
        process.env.emailAdmin === email &&
        process.env.passwordAdmin === password
      ) {
        const formAccount = req.body;

        // Construct image and audio URLs using protocol and request headers
        formAccount.imageMusical =
          req.protocol +
          "://" +
          req.rawHeaders[1] +
          "/image/" +
          req.files.imageMusical[0].filename;
        formAccount.audioMusical =
          req.protocol +
          "://" +
          req.rawHeaders[1] +
          "/audio/" +
          req.files.audioMusical[0].filename;

        // Create a new instance of SchemaDiscover with form data
        const newDiscoverEntry = new SchemaDiscover(formAccount);

        // Save the new entry to the database
        await newDiscoverEntry.save();

        // Redirect back to the previous page
        return res.redirect("back");
      } else {
        // If the user is not an admin, redirect back
        return res.redirect("back");
      }
    } catch (error) {
      // Handle errors by passing them to the next middleware
       // return next(error); //only use when development 
       return res.redirect("back");
    }
  }
}

module.exports = new CreateDiscover();
