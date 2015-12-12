var fs = require('fs');
var c = console;

var co = (function() {
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

  return {
    run:run, 
    write:write,
    read:read 
  }
})();


function *copyFile(fromFile, toFile) {
  c.log('copyFile %s %s', fromFile, toFile);
  var text = yield co.read(fromFile);
  yield co.write(toFile, text);	
}

co.run(function* () { 
  c.log('run ...');
  yield *copyFile(process.argv[2], process.argv[3]); // 如果被 yield 的函數裡還有 yield 的話，就要用 yield * 
});

