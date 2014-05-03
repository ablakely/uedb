module.exports = function(app, uedb) {
	app.get("/list", function(req, res) {
		uedb.Location.find(function(err, locations) {
			res.json(locations);
		})
	})

	app.get("/clear", function(req, res) {
		uedb.Location.find().remove();
	})
}