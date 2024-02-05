class Createpage {
  create(req, res, next) {
    res.render("createPage");
  }
}
module.exports = new Createpage;
