const mainPage = require("./site page/main page");
const account = require("./site page/Acount/controll");
const discover = require("./site page/Discover/controll");

const routes = function (app) {

  app.use('/discover',discover)
  app.use("/account", account);
  // home page routes
  app.use("/", mainPage);
};

module.exports = routes;
