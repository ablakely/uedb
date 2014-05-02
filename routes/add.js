module.exports = function(app, uedb) {
	app.get('/add', function(req, res) {
		res.render("add", {conf: uedb.config});
	});

	app.post('/add', function(req, res) {
		
	});

}