var fs = require('fs');
var async = require('async');
var text = null;

async.series([
  function(callback) {
    fs.readFile("a1.txt", "utf8", function(err, data) { 
      console.log('read a1 complete!');
      text = data;
      console.log("read text="+text);
      callback();
    })
  },
  function(callback) {
    console.log("write text="+text);
    fs.writeFile("a2.txt",  text, function(err) {
      console.log('write a2 complete!');
      callback();
    })
  },
  function(callback) {
    fs.readFile("a2.txt", "utf8", function(err, data) {
      console.log('read a2 complete!');
      text = data;
      console.log("read text="+text);
      callback();
    })
  },
  function(callback) {
    console.log("write text="+text);
    fs.writeFile("a3.txt",  text, function(err) {
      console.log('write a3 complete!');
      callback();
    })
  }
], function done() {
  console.log('All finished!');
});


