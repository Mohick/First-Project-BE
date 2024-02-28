const Admin = require('../../../Schema/SchemaAdmin/Admin')


function handleError404(req, res, next) {
    if(!!req.session.admin) {
        Admin.findOne({ _id: req.session.admin._id }).then((result) => {
            if (!!result) {
                res.status(404).render('Error404/Views');
            } else {
                return res.redirect("/login/");
            }
        })
    }
    else {
        return res.redirect("/login/");
    }
}

module.exports = handleError404