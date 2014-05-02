
/*
 * GET home page.
 */

module.exports = function(app, uedb) {
	app.get('/', function(req, res) {
		res.render("index", {conf: uedb.config});
	})
}