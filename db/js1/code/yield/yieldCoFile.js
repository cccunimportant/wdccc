var co = require('co');
var c = console;

function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, 'utf8', callback);
  };
}

co(function* () {
  var file1 = yield readFile('yieldCoFile.js');
  var file2 = yield readFile('yieldBasic.js');
 
  c.log("file1="+file1);
  c.log("file2="+file2);
});

