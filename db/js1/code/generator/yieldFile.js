var fs = require('fs');
var c = console;

function read(file, resume) {
  fs.readFile(file, function(err, data) {
    if (!err) c.log('read %s success!', file);
    resume(data);
  });
}

function write(file, data, resume) {
  fs.writeFile(file,  data, function(err) {
    if (!err) c.log('write %s success!', file);
    resume();
  });
}

function run(generator) {
    var resume = function(value) {
      gen.next(value);
    }
    var gen = generator(resume);
    gen.next();
}

run(function* (resume) { 
  var text = yield read('yieldFile.js', resume);
  yield write('yieldFile.bak', text, resume);
});