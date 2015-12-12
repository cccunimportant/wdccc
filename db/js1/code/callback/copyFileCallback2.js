var fs = require('fs');
fs.readFile("a1.txt", "utf8", function(err, data) {
  console.log('read a1 complete!');
  fs.writeFile("a2.txt",  data, function(err) {
    console.log('write a2 complete!');
    fs.readFile("a2.txt", "utf8", function(err, data) {
      console.log('read a2 complete!');
      fs.writeFile("a3.txt",  data, function(err) {
        console.log('write a3 complete!');
      });
    });
  });
});