# mz (Modernize node.js) -- 讓 node 基本函式庫支援 ES6 yield promise 等功能的套件

## 安裝

官網： <https://github.com/normalize/mz>

> npm i mz

## 讀取檔案

程式： coFile.js

```javascript
var co = require('co');
var readFile = require('mz/fs').readFile;
var c = console;

co(function* () {
  var file1 = yield readFile('coFile.js');
  var file2 = yield readFile('coFile.js');
 
  c.log("file1="+file1);
  c.log("file2="+file2);
});
```

執行結果

```
nqu-192-168-61-142:example mac020$ iojs coFile
file1=var co = require('co');
var readFile = require('mz/fs').readFile;
var c = console;

co(function* () {
  var file1 = yield readFile('coFile.js');
  var file2 = yield readFile('coFile.js');
 
  c.log("file1="+file1);
  c.log("file2="+file2);
});


file2=var co = require('co');
var readFile = require('mz/fs').readFile;
var c = console;

co(function* () {
  var file1 = yield readFile('coFile.js');
  var file2 = yield readFile('coFile.js');
 
  c.log("file1="+file1);
  c.log("file2="+file2);
});

```

