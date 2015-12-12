# MongoDB -- 安裝與啟動

下載點: <https://www.mongodb.org/downloads>

下載完成後使用『下一步』大法即可完成安裝。

安裝完成之後，在 windows 下必須設定系統路徑，我的路徑在： 『C:\Program Files\MongoDB\Server\3.0\bin』 當中。

接著請啟動命令列，然後建立資料庫路徑 /db/mongodb/ ，接著輸入下列指令。

```
D:\db>mongod --dbpath /db/mongodb
```

此時 mongodb 伺服器就會啟動完成。

```
D:\db>mongo
MongoDB shell version: 3.0.2
connecting to: test
```

接著您就可以使用指令進行『新增/修改/刪除/查詢』了。

## 新增操作

參考： <http://www.w3cschool.cc/mongodb/mongodb-insert.html>

```javascript
> db.user.insert({user:"CCC", password:"123"})
WriteResult({ "nInserted" : 1 })
> db.user.find()
{ "_id" : ObjectId("55486b1327403e89a3cc397a"), "user" : "ccc", "password" : "123" }
> db.user.insert({user:"snoopy", password:"321"})
WriteResult({ "nInserted" : 1 })
> db.user.find()
{ "_id" : ObjectId("55486b1327403e89a3cc397a"), "user" : "ccc", "password" : "123" }
{ "_id" : ObjectId("55487073434ed6d677f8454d"), "user" : "snoopy", "password" : "321" }
```

## 修改操作

參考： <http://www.w3cschool.cc/mongodb/mongodb-update.html>


```javascript
> db.user.update({"user":"snoopy"}, {"user":"snoopy", "password":"snoopy321"})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.user.find()
{ "_id" : ObjectId("55486b1327403e89a3cc397a"), "user" : "ccc", "password" : "123" }
{ "_id" : ObjectId("55487073434ed6d677f8454d"), "user" : "snoopy", "password" : "snoopy321" }
```

## 刪除操作

參考： <http://www.w3cschool.cc/mongodb/mongodb-remove.html>


```javascript
> db.user.find()
{ "_id" : ObjectId("55486b1327403e89a3cc397a"), "user" : "ccc", "password" : "123" }
{ "_id" : ObjectId("55487073434ed6d677f8454d"), "user" : "snoopy", "password" : "snoopy321" }
> db.user.remove({user:"ccc"})
WriteResult({ "nRemoved" : 1 })
> db.user.find()
{ "_id" : ObjectId("55487073434ed6d677f8454d"), "user" : "snoopy", "password" : "snoopy321" }
```

## 查詢操作

參考： <http://www.w3cschool.cc/mongodb/mongodb-update.html>


```javascript
> db.user.insert({user:"garfield", password:"cookie"})
WriteResult({ "nInserted" : 1 })
> db.user.find()
{ "_id" : ObjectId("55487073434ed6d677f8454d"), "user" : "snoopy", "password" : "snoopy321" }
{ "_id" : ObjectId("55487d09434ed6d677f8454e"), "user" : "garfield", "password": "cookie" }
> db.user.find({user:"garfield"})
{ "_id" : ObjectId("55487d09434ed6d677f8454e"), "user" : "garfield", "password": "cookie" }
> db.user.find({user:"snoopy"})
{ "_id" : ObjectId("55487073434ed6d677f8454d"), "user" : "snoopy", "password" :"snoopy321" }
```

