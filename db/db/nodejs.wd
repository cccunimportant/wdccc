# MongoDB -- 使用 node.js 存取

您若要在 node.js 當中存取 mongoDB 的資料，必須先用 npm 安裝 mongoDB 的套件。

```
npm install mongodb
```

但是這個套件有用到原生程式 (c 語言） 的 node-gyp 套件，必須先安裝 python 才能安裝成功，因此您必須先下載 python 2.X （不要下載 3.x) 版並安裝後才能執行上述指令。

Python 的安裝方法請參考 [如何在 Windows 平台建立 Python 編程環境](http://www.foolegg.com/how-to-build-a-python-programming-environment-on-windows/) 這篇文章。

安裝並設定好系統路徑之後，您可以啟動 node.js 的命令列環境，並且用下列操作試試看 python 是否安裝成功。

```
C:\Users\user>python
Python 2.7.9 (default, Dec 10 2014, 12:24:55) [MSC v.1500 32 bit (Intel)] on win
32
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
```

上述是安裝成功的情況。

另外這個套件還用到 NET framework 2.0 sdk 2 ，您必須從 下列網址下載。

* <http://www.microsoft.com/en-us/download/details.aspx?id=15354>

下載完後會是一個 setup.exe 檔案，但如果您用的是 win 8, 則無法執行，必須先用 winRAR 解壓縮之後，會出現一個 install.exe ，然後按滑鼠右鍵選擇『以系統管理員身份執行』才可以安裝，這個訊息來自下列文章。

* <http://stackoverflow.com/questions/13980882/installing-net-2-0-sdk-on-windows-8>


接著請再用一次下述指令安裝 node.js 的 mongodb 套件。

```
npm install mongodb
```

## 程式範例: mongotest.js

參考： <https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html>


```javascript
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/examdb", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('Q');
  var docs = [{ type:"word", q:"he=他"}, { type:"word", q:"she=她"}, { type:"word", q:"it=它"} ];

  collection.insert(docs, {w:1}, function(err, result) { // success!

    collection.find().toArray(function(err, items) {
        console.log("items=%j", items);
        db.close();
    });
 /*   
    var stream = collection.find({}).stream();
    stream.on("data", function(item) {});
    stream.on("end", function() {});

    collection.findOne({}, function(err, item) {});
*/
  });
});
```

執行結果：

```
nqu-192-168-61-142:KoaExam mac020$ node mongotest
items=[{"_id":"554973e94a33f3c734326fc3","type":"word","q":"mother=母親"},{"_id":"554974024a33f3c734326fc4","type":"word","q":"father=父親"},{"_id":"554974164a33f3c734326fc5","type":"word","q":"brother=兄弟"},{"_id":"5549742c4a33f3c734326fc6","type":"word","q":"sister=姐妹"},{"_id":"55497a5e0e398b91d8688819","type":"word","q":"he=他"},{"_id":"55497a5e0e398b91d868881a","type":"word","q":"she=她"},{"_id":"55497a5e0e398b91d868881b","type":"word","q":"it=它"},{"_id":"55497b05deaa289bd81022b5","type":"word","q":"he=他"},{"_id":"55497b05deaa289bd81022b6","type":"word","q":"she=她"},{"_id":"55497b05deaa289bd81022b7","type":"word","q":"it=它"},{"_id":"55497b65609521a0d85f3a33","type":"word","q":"he=他"},{"_id":"55497b65609521a0d85f3a34","type":"word","q":"she=她"},{"_id":"55497b65609521a0d85f3a35","type":"word","q":"it=它"},{"_id":"55497bc4fab0d8a3d8718985","type":"word","q":"he=他"},{"_id":"55497bc4fab0d8a3d8718986","type":"word","q":"she=她"},{"_id":"55497bc4fab0d8a3d8718987","type":"word","q":"it=它"}]
```

## 程式 2 : 修改後的 mongotest.js

```javascript
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/examdb", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('Q');
  var docs = [{ type:"word", q:"he=他"}, { type:"word", q:"she=她"}, { type:"word", q:"it=它"} ];

  collection.insert(docs, {w:1}, function(err, result) { // success!
/*
    collection.find().toArray(function(err, items) {
        console.log("items=%j", items);
        db.close();
    });
 */
    var stream = collection.find({}).stream();
    stream.on("data", function(item) {
        console.log("item=%j", item);
        
    });
    stream.on("end", function() {
        db.close();        
    });

//    collection.findOne({}, function(err, item) {});

  });
});
```

執行結果

```
nqu-192-168-61-142:KoaExam mac020$ node mongotest
item={"_id":"554973e94a33f3c734326fc3","type":"word","q":"mother=母親"}
item={"_id":"554974024a33f3c734326fc4","type":"word","q":"father=父親"}
item={"_id":"554974164a33f3c734326fc5","type":"word","q":"brother=兄弟"}
item={"_id":"5549742c4a33f3c734326fc6","type":"word","q":"sister=姐妹"}
item={"_id":"55497a5e0e398b91d8688819","type":"word","q":"he=他"}
item={"_id":"55497a5e0e398b91d868881a","type":"word","q":"she=她"}
item={"_id":"55497a5e0e398b91d868881b","type":"word","q":"it=它"}
item={"_id":"55497b05deaa289bd81022b5","type":"word","q":"he=他"}
item={"_id":"55497b05deaa289bd81022b6","type":"word","q":"she=她"}
item={"_id":"55497b05deaa289bd81022b7","type":"word","q":"it=它"}
item={"_id":"55497b65609521a0d85f3a33","type":"word","q":"he=他"}
item={"_id":"55497b65609521a0d85f3a34","type":"word","q":"she=她"}
item={"_id":"55497b65609521a0d85f3a35","type":"word","q":"it=它"}
item={"_id":"55497bc4fab0d8a3d8718985","type":"word","q":"he=他"}
item={"_id":"55497bc4fab0d8a3d8718986","type":"word","q":"she=她"}
item={"_id":"55497bc4fab0d8a3d8718987","type":"word","q":"it=它"}
item={"_id":"55497cbf5a5f3aa9d8380b08","type":"word","q":"he=他"}
item={"_id":"55497cbf5a5f3aa9d8380b09","type":"word","q":"she=她"}
item={"_id":"55497cbf5a5f3aa9d8380b0a","type":"word","q":"it=它"}
item={"_id":"55497ccb9f0e23add8f5f9d6","type":"word","q":"he=他"}
item={"_id":"55497ccb9f0e23add8f5f9d7","type":"word","q":"she=她"}
item={"_id":"55497ccb9f0e23add8f5f9d8","type":"word","q":"it=它"}
```

