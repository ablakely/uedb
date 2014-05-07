module.exports = function(app,uedb) {
	app.get('/edit/:lid', function(req, res) {
		uedb.Location.findOne({locationid: req.params.lid}, function(err, location) {
			res.render("edit", {l: location, conf: uedb.config})
		})
	});

	app.post('/edit/:lid', function(req, res) {
		uedb.Location.findOne({locationid: req.params.lid}, function(err, location) {
			if (req.body.name != undefined && req.body.name != "" && req.body.name != null) {
				location.name = req.body.name;
			}

			if (req.body.coords != undefined && req.body.coords != "" && req.body.coords != null) {
				location.coords = new String(req.body.coords).replace(/\(|\)|\s/g, "").split(",");
				location.streetviewImg = uedb.getStreetviewImage(new String(req.body.coords).replace(/\(|\)|\s/g, ""))
			}

			if (req.body.description != undefined && req.body.description != "" && req.body.description != null) {
				location.description = req.body.description;
			}

			if (req.body.built != undefined && req.body.built != "" && req.body.built != null) {
				location.built = req.body.built;
			}

			if (req.body.closed != undefined && req.body.closed != "" && req.body.closed != null) {
				location.closed = req.body.closed;
			}

			if (req.body.security != undefined && req.body.security != "" && req.body.security != null) {
				location.security = req.body.security;
			}

			if (req.body.status != undefined && req.body.status != "" && req.body.status != null) {
				location.status = req.body.status;
			}

			location.save(function() {
				res.redirect("/location/"+req.params.lid);
			});
		})
	}) 
}