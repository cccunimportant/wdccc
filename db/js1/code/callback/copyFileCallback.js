var fs = require('fs');
fs.readFile("a1.txt", "utf8", function(err, data) {
  console.log('read a1 complete!');
  fs.writeFile("a2.txt",  data, function(err) {
    console.log('write a2 complete!');
  });
});