// Importing controllers
const mainPage = require("./site page/main page"); // Main page controller
const account = require("./site page/Acount/controll"); // Account controller
const discover = require("./site page/Discover/controll"); // Discover controller
const login = require("./site page/login/SignIn"); // Login controller
const erorr404 = require("./site page/Error 404/views"); // Error 404 controller
const logOut = require("./site page/Logout/Logout Account")
// Routes configuration function
const routes = function (app) {
  // Login routes
  app.use("/login", login);

  // Discover routes
  app.use("/discover", discover);

  // Account routes
  app.use("/account", account);

  app.use("/logout", logOut);

  // Home page routes
  app.use("/", mainPage);

  // Error 404 route
  app.use(erorr404);
};

// Exporting routes configuration function
module.exports = routes;
