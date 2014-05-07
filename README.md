### Private Location Databases
uedb is a project which is aimed towards the urban exploration community, this tool allows users to create private location databases which are accessible from the web, but are also password protected.

Currently, uedb has only been tested on linux and Mac OS X.  uedb requires you to have [Node.js](http://nodejs.org) and [mongodb](https://www.mongodb.org/downloads) installed.

Once you have node.js and mongodb installed on your target system, it's only a few more steps to get your database up and running:
```
$ cd uedb
$ npm install
$ tools/genconf ./uedbconf.json <db title> <username> <password> [mongodb url]
$ node app
```

### Support or Contact
Having trouble with uedb? Contact me at aaron@ephasic.org.
