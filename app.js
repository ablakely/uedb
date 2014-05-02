
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require("mongoose");

var app = express();
var uedb = {};

uedb.config = JSON.parse(fs.readFileSync(__dirname + "/uedbconf.json", "utf8"));
mongoose.connect(uedb.config.db);

uedb.dbconn = mongoose.connection;

String.prototype.generate = function(size) {
        var rSize = size / 2;

        var charset = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                        'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                        'V', 'W', 'X', 'Y', 'Z'
                       ];

        var res = "";

        for (var i = 0; i < rSize; i++) {
                var x = "" + charset[Math.floor((Math.random()*(charset.length-1))+1)];
                var y = Math.floor((Math.random()*9)+1);

                if (y % 2) {
                        res += x.toLowerCase();
                } else {
                        res += x;
                }

                res += y;
        }

        return res;
};

// Location Entry Model
uedb.Location = new mongoose.model("Location", new mongoose.Schema({
  name:   String,
  locationid: String,
  coords: [Number],
  description: String,
  built: Number,
  closed: Number,
  security: [String],
  albums: [String],
  status: String,
  entrydate: { type: Date, default: Date.now }
}));


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.basicAuth(uedb.config.auth.user, uedb.config.auth.pass));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

fs.readdirSync(__dirname+"/routes").forEach(function(file) {
  require(__dirname+'/routes/'+file)(app,uedb);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
