
/*
 * GET home page.
 */

module.exports = function(app, uedb) {
	app.get('/', function(req, res) {
		uedb.Location.find(function(err, locations) {
			var points = [];
			for (var i = 0; i < locations.length; i++) {
				var c = [locations[i].coords[0], locations[i].coords[1]];
				c.push(locations[i].name)
				c.push(locations[i].locationid)
				points.push(c);
			}

			res.render("index", {conf: uedb.config, loc: locations, points: JSON.stringify(points)});
		});
	})
}
