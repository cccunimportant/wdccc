## Co - 用 yield 讓控制流程更好用的套件

很好的講解: <https://github.com/dead-horse/co-and-koa-talk>


### 安裝

官網： <https://github.com/tj/co>

### 範例：複製檔案

程式： coReadWrite.js

```javascript
var co = require('co');
var fs = require('mz/fs');

co(function* () {
  var file1 = yield fs.readFile('coReadWrite.js');
  yield fs.writeFile('coReadWrite.js.bak', file1);
  var file2 = yield fs.readFile('coReadWrite.js.bak');

  console.log("===coReadWrite.js===\n"+file1);
  console.log("===coReadWrite.js.bak===\n"+file2);
});
```

執行結果

```
NQU-192-168-60-101:iojs csienqu$ iojs coReadWrite 
===coReadWrite.js===
var co = require('co');
var fs = require('mz/fs');

co(function* () {
  var file1 = yield fs.readFile('coReadWrite.js');
  yield fs.writeFile('coReadWrite.js.bak', file1);
  var file2 = yield fs.readFile('coReadWrite.js.bak');

  console.log("===coReadWrite.js===\n"+file1);
  console.log("===coReadWrite.js.bak===\n"+file2);
});
===coReadWrite.js.bak===
var co = require('co');
var fs = require('mz/fs');

co(function* () {
  var file1 = yield fs.readFile('coReadWrite.js');
  yield fs.writeFile('coReadWrite.js.bak', file1);
  var file2 = yield fs.readFile('coReadWrite.js.bak');

  console.log("===coReadWrite.js===\n"+file1);
  console.log("===coReadWrite.js.bak===\n"+file2);
});
NQU-192-168-60-101:iojs csienqu$ ls
coRead2.js		iterator.js		yieldFile.js
coReadWrite.js		node_modules
coReadWrite.js.bak	yieldFile.bak
```

### 將 callback 包裝成可以 yield 的形式

以下範例來自 -- <https://github.com/dead-horse/co-and-koa-talk>


範例： 自行將 callback 函數 thunkify

```javascript
fs.stat(filename, callback);

// =>

function stat(filename) {
  return function (done) {
    fs.stat(filename, done);
  }
}

// =>

function *() {
  yield stat('./README.md');
}
```

範例： 使用 thunkify 套件

```javascript
var thunkify = require('thunkify');
var co = require('co');
var fs = require('fs');

var stat = thunkify(fs.stat);
var readFile = thunkify(fs.readFile);

co(function *() {
  var stat = yield stat('./README.md');
  var content = yield readFile('./README.md');
})();
```

### 自己製作一個 myCo 套件

上文的說明應該已經闡述了如何用 yield 取代 callback 的方法，當然這種方法已經被實作成完整的套件了，像是 co.js 就是一個使用在 koa.js 裏的重要套件。

為了更瞭解 co.js 的原理，我們實作了一個 myCo.js 以便更進一步體會其原理。

檔案： myCo.js

```javascript
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
```

執行結果

```
nqu-192-168-61-142:generator mac020$ iojs myCo myCo.js myCo.bak
run ...
copyFile myCo.js myCo.bak
read myCo.js success!
write myCo.bak success!
```
