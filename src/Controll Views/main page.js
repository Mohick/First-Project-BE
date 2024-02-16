class MainPage {
  async home(req, res, next) {
    try {
      res.render("home page");
    } catch (next) {
      return next();
    }
  }
}
module.exports = new MainPage();
