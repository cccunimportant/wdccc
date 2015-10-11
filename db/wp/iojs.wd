# io.js -- 從 node.js 分裂出來支援 ES6 新語法的新版 node

## 安裝

官網： <https://iojs.org/en/index.html>

下載後一直按接受就行了！

## 用法

和 node.js 一模一樣，只是把 `node <filename>` 改為 `iojs <filename>` 而已！

## 範例：讀取檔案

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
