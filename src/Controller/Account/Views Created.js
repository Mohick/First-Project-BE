class createdContent {
    created(req, res, next) {
        res.render("Account/CRUD/createdContent");
    }
}

module.exports = new createdContent;