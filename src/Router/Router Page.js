const homePage = require('./sitePage/homePage');
const createPage = require('./sitePage/createPage');

const routes = function (app) {
    app.use('/create',createPage)
    app.use('/',homePage)

}

module.exports = routes