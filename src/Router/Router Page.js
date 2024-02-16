const mainPage = require("./site page/main page");
const account = require("./site page/Acount/controll");

const routes = function (app) {
  // app.use('/account/',linkAccounts)
  // app.use('/discover',createPage)

  app.use("/account", account);
  // home page routes
  app.use("/", mainPage);
};

module.exports = routes;
