
const routes = function (app) {
    // app.use('/account/',linkAccounts)
    // app.use('/discover',createPage)

    // home page routes
    app.get('/',function (req, res) {
        res.render('home page')
    })

}

module.exports = routes