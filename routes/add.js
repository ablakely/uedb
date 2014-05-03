module.exports = function(app, uedb) {
	app.get('/add', function(req, res) {
		res.render("add", {conf: uedb.config});
	});

	app.post('/add', function(req, res) {
		var l = new uedb.Location({
			name: 	req.body.inputName,
			locationid: new String().generate(20),
			coords: new String(req.body.inputCoordinates).replace(/\(|\)|\s/g, "").split(","),
			streetviewImg: uedb.getStreetviewImage(new String(req.body.inputCoordinates).replace(/\(|\)|\s/g, ""))
		});

		l.save(function() {
			res.redirect("/");
		});
	});

}