# mongolab 的用法

請參考：

* [MongoDB Tutorial（1）雲端時代的 MongoDB 環境建置](http://www.codedata.com.tw/database/mongodb-tutorial-1-setting-up-cloud-env/)
* [MongoDB Tutorial（2）MongoDB 的 Query Language](http://www.codedata.com.tw/database/mongodb-tutorial-2-query-language/)
* [MONGODB 快速筆記](http://fred-zone.blogspot.tw/2011/07/mongodb.html)
* [NODEJS 與 MONGODB 的邂逅](http://fred-zone.blogspot.tw/2012/01/nodejs-mongodb.html)

## 用 node-mongolab 存取資料

如果使用 <https://github.com/petersirka/node-mongolab> 這個套件存取資料庫，您可以從 https://mongolab.com/user?username=[username] 當中取得金鑰，然後您可以從 https://api.mongolab.com/api/1/databases?apiKey=[apiKey] 查到您現有的資料庫。

檔案：mongolabTest.js

```javascript
// npm install mongolab-provider

var mongodb = require('mongolab-provider').init("user", "[我的apiKey]");

mongodb.collections(function(err, obj) {
console.log('collections:obj=%j',obj);
});

mongodb.documents("users", {}, function(err, obj) {
console.log('documents:obj=%j',obj);
});
```

執行結果

```
D:\git\mongodb>node mongolabTest.js
collections:obj=["system.indexes","users"]
documents:obj=[{"_id":{"$oid":"551c913ee4b040a27e5b556d"},"name":"ccc","password
":"1234567"},{"_id":{"$oid":"551c9175e4b040a27e5b556e"},"name":"abc","password":
"321"}]
```

## 直接用 mongodb driver 存取資料

但是、透過 node-mongolab 並非必要的，其實你可以直接透過 mongodb 這個標準接口直接連上 mongolab，如下所示：

首先、請從 https://mongolab.com/databases/<db> 查出您的資料庫連接方式，主要是取得 port 的資訊，接著就可以用任何 mongodb 的客戶端工具 （像是 robomongo 等）連接上去，例如以下是我從  https://mongolab.com/databases/user 中所取得的連接方式資料：

```
To connect using the shell:
mongo ds059821.mongolab.com:59821/user -u <dbuser> -p <dbpassword>
To connect using a driver via the standard URI (what's this?):
  mongodb://<dbuser>:<dbpassword>@ds059821.mongolab.com:59821/user
```

按理說、我們應該可以透過這個連接方式，直接用標準的接法連接上去，就讓我們來試試看。

檔案：mongolabTest2.js

```javascript
var mongodb = require('mongodb');

var server = 'ds059821.mongolab.com';
var port   = 59821;
var user   = 'ccckmit';
var password ="[我的 password]";

var mongodbServer = new mongodb.Server(server, port, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('user', mongodbServer);
db.open(function() {
  db.authenticate(user, password, function(err, res) {
    if (!err) {
      console.log("Authenticated");
    } else {
      console.log("Error in authentication.");
      console.log(err);
    }
    db.collection('users', function(err, collection) {

        collection.insert({
            name: 'snoopy',
            password: 'ypoons'
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });

        collection.find({ name: 'snoopy' }, function(err, data) {
            if (data) {
                console.log('data='+data+' name='+data.name);
            } else {
                console.log('Cannot found');
            }
        });
//        db.close();       
    });
  });
});

```

結果、insert 指令是成功了，但是 find 指令卻沒辦法取得 name 欄位和password 欄位，原因為何我還不清楚？

```
D:\git\mongodb>node mongolabTest2
Authenticated
data=[object Object] name=undefined
```

