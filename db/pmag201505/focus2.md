## ECMAScript 6 的新語法

如前文所述，ECMAScript 6 (ES6) 是 2015 年制定完成的 JavaScript 語言標準，既然筆者這篇文章撰寫的時間點也是 2015 年，那您應該會想，這個標準恐怕還得要好幾年才會實現吧！

如果您這樣想的話，那可就大錯特錯了！ 在這個變動快速的今天， 在 ES6 還在一邊制定的時候， Google Chrome 就已經將這些功能加入到瀏覽器當中了，其他瀏覽器當然也不希望因此而落後，所以 Firefox, IE, Opera, Safari 無不卯足了勁的更新他們的瀏覽器引擎。

如果您想要瞭解各家瀏覽器與 javascript 引擎對 ES6 的支援程度，可以參考下列表格：

* <https://kangax.github.io/compat-table/es6/>

而 server  端的 node.js 既然採用 Google 的 V8 引擎，自然也會隨之更新，於是 node.js 的新版也已經擁有這些功能，只是在使用時必須加上 --harmony 參數才會起動，而為了要不要預設啟動 ES6 功能的問題，以便進一步加入更多先進功能到 node.js 當中，更導致了 node.js 陣營的分裂 (fork)，關於 io.js 之所以要從 node.js 分裂出來的原因，您可以參考下列文章！

* 您不可不知的 io.js -- <http://blog.wu-boy.com/2015/02/getting-to-know-io-js/> 

問題是、到底 ES6 的新語法有哪些呢？ 關於這點說來就長了，筆者整理了一份表格如下。


| 語法 | 範例 | 說明 |
|---------|-------|---------|
| arrows  |  |  |
| classes |  |  |
| enhanced object literals |  |  |
| template strings |  |  |
| destructuring |  |  |
| default + rest + spread |  |  |
| let + const |  |  |
| iterators + for..of |  |  |
| generators |  |  |
| unicode |  |  |
| modules |  |  |
| module loaders |  |  |
| map + set + weakmap + weakset |  |  |
| proxies |  |  |
| symbols |  |  |
| subclassable built-ins |  |  |
| promises |  |  |
| math + number + string + array + object APIs |  |  |
| binary and octal literals |  |  |
| reflect api |  |  |
| tail calls |  |  |

如果您想更進一步瞭解這些新語法，已經有人寫好很棒的教材了，請參考下列的書籍和範例：

* ECMAScript 6入门 (作者：阮一峰) -- <http://es6.ruanyifeng.com/>
* [github/lukehoban/es6features](https://github.com/lukehoban/es6features/blob/master/README.md)
* [初探ECMAScript 6 (上)](http://www.runpc.com.tw/content/content.aspx?id=109836)
* [初探ECMAScript 6 (下)](http://www.runpc.com.tw/content/content.aspx?id=109837)

如果您看完了上述的書籍和範例，勢必產生一個驚嘆號！

ECMAScript 第 6 版怎麼改變得這麼大阿！

先別急著驚訝，更厲害的是，這些功能所衍生出來的開放原始碼框架，已經滿坑滿谷了。

要瞭解那滿坑滿谷基於 ES6 的開放原始碼框架，請繼續看下一篇文章！

 




