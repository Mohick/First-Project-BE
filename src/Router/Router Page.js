const mainPage = require("./site page/main page");
const account = require("./site page/Acount/controll");
const discover = require("./site page/Discover/controll")
const login = require("./site page/login/SignIn");
const erorr404 = require("./site page/Error 404/views")
const routes = function (app) {
  app.use("/login", login);
  app.use("/discover", discover);
  app.use("/account", account);
  // home page routes
  app.use("/", mainPage);
  app.use(erorr404);
};

module.exports = routes;
