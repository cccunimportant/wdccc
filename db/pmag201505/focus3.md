# Yield 與 Generator -- 讓 callback 不再是 javascript 的痛

雖然 新版的 JavaScript (ECMAScript 6, ES6) 有很多新穎的功能，但是其中最重要的，恐怕就是基於 yield 語法所衍生出來的一連串功能了，這種語法在 ruby 當中早就有了，並不是新鮮事，但是引入了 JavaScript 這個語言之後，就讓長期依靠 callback 的 node.js 等平台，有了全新的函式庫框架。

要理解 yield 與 generator 之前，最好先瞭解一下 iterator 這個概念，

## Iterator

Iterator 是用來遊走某些容器的物件，裡面通常包涵了 next() 這樣一個用來遊走的函數，可以前進到下一步，以下是一個陣列的 iterator 之實作方法。

檔案： iterator.js

```javascript
var c = console;

function arrayIterator(array){
  var i = 0;
  var obj = {
    next: function(){
      return i < array.length ?
        {value: array[i++], done: false} :
        {value: undefined, done: true};
    }
  }
  return obj;
}

var ai = arrayIterator(['x', 'y', 'z']);

c.log(ai.next()); // { value: "x", done: false }
c.log(ai.next()); // { value: "y", done: false }
c.log(ai.next()); // { value: "z", done: false }
c.log(ai.next()); // { value: undefined, done: true }
```

執行結果

```
D:\git\generator>iojs iterator
{ value: 'x', done: false }
{ value: 'y', done: false }
{ value: 'z', done: false }
{ value: undefined, done: true }
```

有了這樣的『遊走裝置』之後，我們就可以對各種容器從頭走到尾，而不需要在意到底容器的內部結構長什麼樣了，只要該容器支援 next() 函數就行了。

例如我們可以用下列程式對陣列的 iterator 進行從頭到尾的遊走過程。

```javascript
while (true) {
	var item = ai.next();
	if (item.done === true)
		break;
  c.log(item);
}
```

## Yield 語法

當您理解了上述的 iterator 之設計方式之後，就可以開始來看看 ECMAScript 6 當中新制定的 yield 語法了，以下是一個使用 yield 語法的範例！

檔案： yield1.js

```javascript
var c = console;

function *gen1(){
	var a=5, b=3;
	yield "x";
	c.log("a=%d", a);
	yield "y";
	b = a+b;
	c.log("b=%d", b);
	return "z";
}

var g1 = gen1();

c.log(g1.next()); // { value: "x", done: false }
c.log(g1.next()); // { value: "y", done: false }
c.log(g1.next()); // { value: "z", done: true }
c.log(g1.next()); // { value: undefined, done: true }

```

執行結果

```
D:\git\generator>iojs yield1
{ value: 'x', done: false }
a=5
{ value: 'y', done: false }
b=8
{ value: 'z', done: true }
{ value: undefined, done: true }
```

上述的程式看來有點詭異，但是如果您將函數想像成一個『擁有狀態的可執行容器』，而 next() 則是讓該函數前進一步，那麼所謂的 yield 只不過是把該函數目前的狀態傳回來而已。

於是、函數就變成了一種容器物件，而 next() 則可以讓函數向前執行，直到碰到下一個 yield 或 return  指令為止，而 yield 指令傳回的 done 會是 false，但 return 指令則會傳回 done=true。

## Yield 的真正用途

大致瞭解了 yield 的原理之後，讓我們來看一下 yield 的真正用途，以下我們將用 delay 函數作為範例，示範 yield 的奇特用法。

檔案： yieldDelay.js

```javascript
var g = gen(); // 建立函數物件
g.next(); // 開始執行到第一個 yield

var totalDelay = 0;

function delay(ms) {
  setTimeout(function() {
    console.log("delay "+ms+" ms");
    totalDelay += ms;
    g.next(totalDelay); // 這個 yield 完成後，傳回 totalDelay 並呼叫 next() 繼續執行到下一個 yield
  }, ms);
}

function *gen(){
  var a=5, b=3, t;
  t = yield delay(800);
  console.log("a=%d t=%d", a, t);
  t = yield delay(500);
  b = a+b;
  console.log("b=%d t=%d", b, t);
  t = yield delay(300);
  console.log("totalDelay=%d t=%d", totalDelay, t);
}
```

執行結果

```
D:\git\generator>iojs yieldDelay
delay 800 ms
a=5 t=800
delay 500 ms
b=8 t=1300
delay 300 ms
totalDelay=1600 t=1600
```

您可以看到上述的執行時間，以便驗證一下是否和你想的一樣。

## 用 yield 取代 callback

大部分的 javascript 環境並不提供多線程 (multi-thread) 機制，於是輸出入的函數都會改用 callback 的方式設計。

舉例而言， node.js 的輸出入函數就幾乎都有兩個版本，設計者通常會用採用 callback 的非同步版本以便在等待輸出入完成的時候還可以繼續執行程式，以下就是一個採用非同步輸出入的 node 程式範例。

檔案： copyFile.js

```javascript
var fs = require('fs');

function copyFile(fromFile, toFile) {
  fs.readFile(fromFile, "utf8", function(err, data) {
    console.log('read %s complete!', fromFile);
    fs.writeFile(toFile,  data, function(err) {
      console.log('write %s complete!', toFile);
    });
  });
}

copyFile(process.argv[2], process.argv[3]);
```

執行結果

```
D:\git\generator>node copyFile copyFile.js copyFile2.js
read copyFile.js complete!
write copyFile2.js complete!
```

但是、有了 yield 指令與有狀態的函數之後，就可以利用下列的方法，讓 callback 轉變為沒有 callback 的函數，只是在尚未結束之前要改用 yield 而已，以下是一個範例。

檔案： yieldFile.js

```javascript
var fs = require('fs');
var gen;

function run(generator) {
  gen = generator();
  gen.next();
}

function read(file) {
  fs.readFile(file, function(err, data) {
    if (!err) console.log('read %s success!', file);
    gen.next(data);
  });
}

function write(file, data) {
  fs.writeFile(file,  data, function(err) {
    if (!err) console.log('write %s success!', file);
    gen.next();
  });
}

run(function* () { 
  var text = yield read('yieldFile.js');
  yield write('yieldFile.bak', text);
});
```

執行結果

```
nqu-192-168-61-142:generator mac020$ iojs yieldFile
read yieldFile.js success!
write yieldFile.bak success!

```
