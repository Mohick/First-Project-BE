class HomePageDiscover {
  async chooseMode(req, res, next) {
    try {
      await res.render('./Discover/choose mode');
    } catch (next) {
        return next();
    }
  }
}


module.exports = new HomePageDiscover()
