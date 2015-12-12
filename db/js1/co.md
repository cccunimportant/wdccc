# co -- 用 yield 讓控制流程更好用的套件

## 安裝

官網： <https://github.com/tj/co>

## 範例：複製檔案

程式： coReadWrite.js

```javascript
var co = require('co');
var fs = require('mz/fs');

var readFile = fs.readFile;
var writeFile = fs.writeFile;

co(function* () {
  var file1 = yield readFile('coReadWrite.js');
  yield writeFile('coReadWrite.js.bak', file1);
  var file2 = yield readFile('coReadWrite.js.bak');

  console.log("===coReadWrite.js===\n"+file1);
  console.log("===coReadWrite.js.bak===\n"+file2);
});
```

執行結果

```
nqu-192-168-61-142:example mac020$ iojs coReadWrite
===coReadWrite.js===
var co = require('co');
var fs = require('mz/fs');
var c = console;

var readFile = fs.readFile;
var writeFile = fs.writeFile;

co(function* () {
  var file1 = yield readFile('coReadWrite.js');
  yield writeFile('coReadWrite.js.bak', file1);
  var file2 = yield readFile('coReadWrite.js.bak');

  c.log("===coReadWrite.js===\n"+file1);
  c.log("===coReadWrite.js.bak===\n"+file2);
});
===coReadWrite.js.bak===
var co = require('co');
var fs = require('mz/fs');
var c = console;

var readFile = fs.readFile;
var writeFile = fs.writeFile;

co(function* () {
  var file1 = yield readFile('coReadWrite.js');
  yield writeFile('coReadWrite.js.bak', file1);
  var file2 = yield readFile('coReadWrite.js.bak');

  c.log("===coReadWrite.js===\n"+file1);
  c.log("===coReadWrite.js.bak===\n"+file2);
});
```

