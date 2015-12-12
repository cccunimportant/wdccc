var fs = require('fs');

function copyFile(fromFile, toFile) {
  fs.readFile(fromFile, "utf8", function(err, data) {
    console.log('read %s complete!', fromFile);
    fs.writeFile(toFile,  data, function(err) {
      console.log('write %s complete!', toFile);
    });
  });
}

copyFile(process.argv[2], process.argv[3]);
