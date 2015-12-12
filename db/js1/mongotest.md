# mongotest.js -- mongodb 測試

參考： <https://www.npmjs.com/package/mongodb>

```javascript
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/examdb", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('Q');
  var docs = [{ _id:"he", type:"word", q:"he=他"}, { _id:"she", type:"word", q:"she=她"}, { _id:"it", type:"word", q:"it=它"} ];

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
item={"_id":"he","type":"word","q":"he=他"}
item={"_id":"she","type":"word","q":"she=她"}
item={"_id":"it","type":"word","q":"it=它"}
```

