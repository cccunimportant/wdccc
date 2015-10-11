# MongoDB -- 進階操作

## 連接開啟 mydb 資料庫

```javascript
D:\db>mongo mydb
MongoDB shell version: 3.0.2
connecting to: mydb
```

## 新增三筆資料

```javascript
> db.users.insert({name:"ccc", age:45, password:"321"})
WriteResult({ "nInserted" : 1 })
> db.users.insert({name:"snoopy", age:5, password:"snoopy123"})
WriteResult({ "nInserted" : 1 })
> db.users.insert({name:"garfield", age:9, password:"garfield123"})
WriteResult({ "nInserted" : 1 })
> db.users.find()
{ "_id" : ObjectId("55487ecd3c69cbdeba209fb3"), "name" : "ccc", "age" : 45, "password" : "321" }
{ "_id" : ObjectId("55487ede3c69cbdeba209fb4"), "name" : "snoopy", "age" : 5, "password" : "snoopy123" }
{ "_id" : ObjectId("55487eed3c69cbdeba209fb5"), "name" : "garfield", "age" : 9,"password" : "garfield123" }
```


## 條件式查詢

參考： <http://www.w3cschool.cc/mongodb/mongodb-operators.html>

```javascript
> db.users.find({age :{$gt : 8}})
{ "_id" : ObjectId("55487ecd3c69cbdeba209fb3"), "name" : "ccc", "age" : 45, "password" : "321" }
{ "_id" : ObjectId("55487eed3c69cbdeba209fb5"), "name" : "garfield", "age" : 9,"password" : "garfield123" }
> db.users.find()
{ "_id" : ObjectId("55487ecd3c69cbdeba209fb3"), "name" : "ccc", "age" : 45, "password" : "321" }
{ "_id" : ObjectId("55487ede3c69cbdeba209fb4"), "name" : "snoopy", "age" : 5, "password" : "snoopy123" }
{ "_id" : ObjectId("55487eed3c69cbdeba209fb5"), "name" : "garfield", "age" : 9, "password" : "garfield123" }
> db.users.find().limit(2)
{ "_id" : ObjectId("55487ecd3c69cbdeba209fb3"), "name" : "ccc", "age" : 45, "password" : "321" }
{ "_id" : ObjectId("55487ede3c69cbdeba209fb4"), "name" : "snoopy", "age" : 5, "password" : "snoopy123" }
> db.users.find().limit(2).skip(1)
{ "_id" : ObjectId("55487ede3c69cbdeba209fb4"), "name" : "snoopy", "age" : 5, "password" : "snoopy123" }
{ "_id" : ObjectId("55487eed3c69cbdeba209fb5"), "name" : "garfield", "age" : 9,"password" : "garfield123" }
```

## 排序與索引

```javascript
> db.users.find().sort({age:1})
{ "_id" : ObjectId("55487ede3c69cbdeba209fb4"), "name" : "snoopy", "age" : 5, "password" : "snoopy123" }
{ "_id" : ObjectId("55487eed3c69cbdeba209fb5"), "name" : "garfield", "age" : 9,"password" : "garfield123" }
{ "_id" : ObjectId("55487ecd3c69cbdeba209fb3"), "name" : "ccc", "age" : 45, "password" : "321" }
> db.users.find().sort({age:-1})
{ "_id" : ObjectId("55487ecd3c69cbdeba209fb3"), "name" : "ccc", "age" : 45, "password" : "321" }
{ "_id" : ObjectId("55487eed3c69cbdeba209fb5"), "name" : "garfield", "age" : 9,"password" : "garfield123" }
{ "_id" : ObjectId("55487ede3c69cbdeba209fb4"), "name" : "snoopy", "age" : 5, "password" : "snoopy123" }
> db.users.ensureIndex({name:1})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
```

## 離開

```javascript
> quit()

D:\db>
```

