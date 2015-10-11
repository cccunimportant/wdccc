# Mac 版安裝與基本操作

## 安裝

參考： <http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/?_ga=1.133628232.774801037.1426659151>

```
$ sudo brew install mongodb
$ sudo mongod
```

## 使用

```
nqu-192-168-61-142:~ mac020$ mongo examdb
MongoDB shell version: 2.6.8
connecting to: examdb
Server has startup warnings: 
2015-05-06T09:44:38.411+0800 [initandlisten] 
2015-05-06T09:44:38.411+0800 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
> db.Q.insert({ type:"word", q:"mother=母親"})
WriteResult({ "nInserted" : 1 })
> db.Q.insert({ type:"word", q:"father=父親"})
WriteResult({ "nInserted" : 1 })
> db.Q.insert({ type:"word", q:"brother=兄弟"})
WriteResult({ "nInserted" : 1 })
> db.Q.insert({ type:"word", q:"sister=姐妹"})
WriteResult({ "nInserted" : 1 })
> db.Q.find()
{ "_id" : ObjectId("554973e94a33f3c734326fc3"), "type" : "word", "q" : "mother=母親" }
{ "_id" : ObjectId("554974024a33f3c734326fc4"), "type" : "word", "q" : "father=父親" }
{ "_id" : ObjectId("554974164a33f3c734326fc5"), "type" : "word", "q" : "brother=兄弟" }
{ "_id" : ObjectId("5549742c4a33f3c734326fc6"), "type" : "word", "q" : "sister=姐妹" }
> 
```