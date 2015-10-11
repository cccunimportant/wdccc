# JavaScript 的 Callback 機制

參考：  

* Nodejs异步流程控制Async -- <http://blog.fens.me/nodejs-async/>
* Javascript中非同步執行的一些問題 -- <http://ithelp.ithome.com.tw/question/10119265>
* 使用Flow Control Library來解決非同步的流程問題 -- <http://ithelp.ithome.com.tw/question/10119281>
* node.js async.series not working -- <http://stackoverflow.com/questions/10779123/node-js-async-series-not-working>

## 回呼的使用

檔案：readfile.js

```javascript
var fs = require('fs'); // 引用檔案物件
var data = fs.readFileSync(process.argv[2], "utf8"); // 讀取檔案
console.log(data); // 顯示在螢幕上
```

檔案： readfileCallback.js

```javascript
var fs = require('fs'); // 引用檔案物件
fs.readFile(process.argv[2], "utf8", function(err, data) {
  console.log("data="+data);
});
console.log("----readFile End-----"); // 顯示在螢幕上
```

檔案：copyfile.js

```javascript
var fs = require('fs');
var data = fs.readFileSync(process.argv[2]);
console.log(data);
fs.writeFileSync(process.argv[3], data);
```

檔案：copyfileCallback.js

```javascript
var fs = require('fs');
fs.readFile("a1.txt", "utf8", function(err, data) {
  console.log('read a1 complete!');
  fs.writeFile("a2.txt",  data, function(err) {
    console.log('write a2 complete!');
  });
});
```

## 多層回呼

檔案：copyfile2.js

```javascript
var fs = require('fs');
var data = fs.readFileSync("a1.txt");
console.log(data);
fs.writeFileSync("a2.txt", data);
var data2 = fs.readFileSync("a2.txt");
console.log(data);
fs.writeFileSync("a3.txt", data);
```

檔案：copyfileCallback2.js

```javascript
var fs = require('fs');
fs.readFile("a1.txt", "utf8", function(err, data) {
  console.log('read a1 complete!');
  fs.writeFile("a2.txt",  data, function(err) {
    console.log('write a2 complete!');
    fs.readFile("a2.txt", "utf8", function(err, data) {
      console.log('read a2 complete!');
      fs.writeFile("a3.txt",  data, function(err) {
        console.log('write a3 complete!');
      });
    });
  });
});
```

## 使用 Async 避免多層回呼

檔案： copyFileAsync2.js

```javascript
var fs = require('fs');
var async = require('async');
var text = null;

async.series([
  function(callback) {
    fs.readFile("a1.txt", "utf8", function(err, data) { 
      console.log('read a1 complete!');
      text = data;
      console.log("read text="+text);
      callback();
    })
  },
  function(callback) {
    console.log("write text="+text);
    fs.writeFile("a2.txt",  text, function(err) {
      console.log('write a2 complete!');
      callback();
    })
  },
  function(callback) {
    fs.readFile("a2.txt", "utf8", function(err, data) {
      console.log('read a2 complete!');
      text = data;
      console.log("read text="+text);
      callback();
    })
  },
  function(callback) {
    console.log("write text="+text);
    fs.writeFile("a3.txt",  text, function(err) {
      console.log('write a3 complete!');
      callback();
    })
  }
], function done() {
  console.log('All finished!');
});
```

## 回呼的設計

檔案：callback.js

```javascript
function sum(n) {
  var i, s=0;
  for (i=1; i<=n; i++)
    s = s+i;
  return s;
}

function sum_async(n, callback) {
  var i, s=0;
  for (i=1; i<=n; i++)
    s = s+i;
  callback(s);
  return s;
}

console.log("sum(10)="+sum(10));

function sum_callback(total) {
  console.log("sum_callback:total="+total);
}

sum_async(10, sum_callback);

sum_async(10, function sum_callback2(total) {
  console.log("sum_callback2:total="+total);
});

sum_async(10, function (total) {
  console.log("1+...+10=total="+total);
});


```



