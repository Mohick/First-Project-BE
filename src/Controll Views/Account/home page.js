class HomePageAccount {
  async chooseMode(req, res, next) {
    try {
      await res.render('./Account/choose mode');
    } catch (next) {
        return next();
    }
  }
}


module.exports = new HomePageAccount()
