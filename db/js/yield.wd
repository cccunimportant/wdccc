# JavaScript 新語法 -- Yield (Generator)

想不到我買的這本書竟然有創用電子版，太棒了！

* ECMAScript 6入门 -- <http://es6.ruanyifeng.com/>

## yield 基礎

程式來源： <http://www.sitepoint.com/javascript-generators-preventing-callback-hell/>

程式： yieldBasic.js

```javascript
function* HelloGen() {
  yield 100;
  yield 400;
}
 
var gen = HelloGen();
 
console.log(gen.next()); // {value: 100, done: false}
console.log(gen.next()); // {value: 400, done: false}
console.log(gen.next()); // {value: undefined, done: true}
```

執行結果： 

```
nqu-192-168-61-142:yield mac020$ iojs yieldBasic
{ value: 100, done: false }
{ value: 400, done: false }
{ value: undefined, done: true }
```

程式： yieldBasic2.js

```javascript
function* HelloGen2() {
  var a = yield 100;
  console.log("a="+a);
  var b = yield a + 100;
  console.log("b="+b);
}
 
var gen2 = HelloGen2();
 
console.log(gen2.next());     // {value: 100, done: false}
console.log(gen2.next(500));  // {value: 600, done: false}
console.log(gen2.next(1000)); // {value: undefined, done: true}

```

執行結果： 

```
nqu-192-168-61-142:yield mac020$ iojs yieldBasic2
{ value: 100, done: false }
a=500
{ value: 600, done: false }
b=1000
{ value: undefined, done: true }

```


## 用 yield 取代回呼函數

程式來源： <http://modernweb.com/2014/02/10/replacing-callbacks-with-es6-generators/>

檔案： yieldDelay.js

```
function delay(time, callback) {
  setTimeout(function () {
    callback("Slept for "+time);
  }, time);
}

function run(generatorFunction) {
    var generatorItr = generatorFunction(resume);
    function resume(callbackValue) {
        generatorItr.next(callbackValue);
    }
    generatorItr.next()
}

function* myDelayedMessages(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(1200, resume));
}

run(function* myDelayedMessages(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(1200, resume));
})
```

執行結果：

```
nqu-192-168-61-142:yield mac020$ iojs yieldDelay
Slept for 1000
Slept for 1200
```

## 套件 co

程式來源： <http://www.sitepoint.com/javascript-generators-preventing-callback-hell/>

