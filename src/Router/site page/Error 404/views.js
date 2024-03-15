// Import the Admin schema
const Admin = require('../../../Schema/SchemaAdmin/Admin');

// Middleware to handle 404 errors
function handleError404(req, res, next) {
    // Check if there is an admin session
    if (!!req.session.admin) {
        // Find the admin by session ID
        Admin.findOne({ _id: req.session.admin._id }).then((result) => {
            // If admin is found
            if (!!result) {
                // Render the 404 error page
                res.status(404).render('Error404/Views');
            } else {
                // Redirect back if admin is not found
                return res.redirect("back");
            }
        });
    } else {
        // Redirect back if there is no admin session
        return res.redirect("back");
    }
}

// Export the middleware
module.exports = handleError404;
