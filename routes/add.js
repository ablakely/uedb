var fs        = require("fs");
var togeojson = require("togeojson");
var jsdom     = require("jsdom").jsdom;

module.exports = function(app, uedb) {
	app.get('/add', function(req, res) {
		res.render("add", {conf: uedb.config});
	});

	app.post('/add', function(req, res) {
		if (req.files == undefined) {
			var l = new uedb.Location({
				name: 	req.body.inputName,
				locationid: new String().generate(20),
				coords: new String(req.body.inputCoordinates).replace(/\(|\)|\s/g, "").split(","),
				streetviewImg: uedb.getStreetviewImage(new String(req.body.inputCoordinates).replace(/\(|\)|\s/g, ""))
			});

			l.save(function() {
				res.redirect("/");
			});
		} else {
			var locations = togeojson.kml(jsdom(fs.readFileSync(req.files.inputFile.path, 'utf8')));
			for (var i = 0; i < locations.features.length; i++) {
				var newloc = new uedb.Location({
					name: locations.features[i].properties.name,
					locationid: new String().generate(20),
					coords: [locations.features[i].geometry.coordinates[1], locations.features[i].geometry.coordinates[0]],
					streetviewImg: uedb.getStreetviewImage(locations.features[i].geometry.coordinates[1]+","+locations.features[i].geometry.coordinates[0])
				});

				newloc.save();
			}

			res.redirect("/");
		}
	});

}