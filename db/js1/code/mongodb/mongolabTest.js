// npm install mongolab-provider

var mongodb = require('mongolab-provider').init("user", "meiPanF1SxNm7RkkECy4nulUHmPxVIXw");

mongodb.collections(function(err, obj) {
console.log('collections:obj=%j',obj);
});

mongodb.documents("users", {}, function(err, obj) {
console.log('documents:obj=%j',obj);
});