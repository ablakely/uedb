module.exports = function(app,uedb) {
	app.get('/location/:lid', function(req, res) {
		uedb.Location.findOne({locationid: req.params.lid}, function(err, location) {
			res.render("view", {l: location, conf: uedb.config})
		})
	}) 
}