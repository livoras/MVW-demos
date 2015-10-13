function init(app) {
  app.get("/products", function(req, content, callback) {
    setTimeout(function () {
      callback(null, {
        list: [{name: "jerry"}, {name: "tomy"}],
        totalCount: 100 + Math.floor(100 * Math.random())
      })
    }, 500)
  })
}

module.exports = init
