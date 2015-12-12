var fs = require('fs');
var c = console;

var gen;

var resume = function(value) {
  gen.next(value);
}

function read(file) {
  fs.readFile(file, function(err, data) {
    if (!err) c.log('read %s success!', file);
    resume(data);
  });
}

function write(file, data) {
  fs.writeFile(file,  data, function(err) {
    if (!err) c.log('write %s success!', file);
    resume();
  });
}

function run(generator) {
    gen = generator();
    gen.next();
}
/*
run(function* () { 
  // 請注意，這裡的 resume 是由 run 裡面的第一行所定義後綁定的，這有點詭異就是了。
  var text = yield read('yieldFile.js');
  yield write('yieldFile2.js', text);
});
*/
function *copyFile(fromFile, toFile) {
  var text = yield read(fromFile);
  yield write(toFile, text);	
}

run(function* () { 
  copyFile(process.argv[2], process.argv[3]);
});