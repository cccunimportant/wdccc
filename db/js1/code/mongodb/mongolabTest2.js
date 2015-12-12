var mongodb = require('mongodb');

var server = 'ds059821.mongolab.com';
var port   = 59821;
var user   = 'ccckmit';
var password = process.argv[2];

var mongodbServer = new mongodb.Server(server, port, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('user', mongodbServer);
db.open(function() {
  db.authenticate(user, password, function(err, res) {
    if (!err) {
      console.log("Authenticated");
    } else {
      console.log("Error in authentication.");
      console.log(err);
    }
    db.collection('users', function(err, collection) {
/*			
        collection.insert({
            name: 'snoopy',
            password: 'ypoons'
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });
*/
        collection.find({ name: 'snoopy' }, function(err, data) {
            if (data) {
                console.log('data='+data+' name='+data.name);
            } else {
                console.log('Cannot found');
            }
        });
//				db.close();				
    });
  });
});


