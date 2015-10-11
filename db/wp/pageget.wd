# 網頁下載 （下載一個網頁）

## 程式

檔案： pageget.js

```javascript
var http = require('http');

http.get("http://www.nqu.edu.tw/cht/index.php?", function(res) {
  console.log("Got response: " + res.statusCode);
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
```

## 執行結果

```
NQU-192-168-60-101:crawler csienqu$ node pageget.js
Got response: 200
BODY: <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="zh-TW">

<head>
  <title>國立金門大學-></title>
...
</body>
</html>
```



