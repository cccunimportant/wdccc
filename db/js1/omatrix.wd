# 矩陣運算(物件版)

檔案: omatrix.js

```javascript
var matrix = function(m) {
  this.m = m;
	
	this.transpose = function(){
		var r = [];
		var a = this.m;
		for(var j = 0; j < a[0].length; j++){
			r[j] = [];
			for(var i = 0; i < a.length; i++){
				r[j][i] = a[i][j];
			}
		}

		return new matrix(r);
	}

	this.add = function(o){
		var r = [];
		var a = this.m, b = o.m;
		for(var i = 0; i < a.length; i++){
			r[i] = [];
			for(var j = 0; j < a[i].length; j++){
				r[i][j] = a[i][j] + b[i][j];
			}
		}
		return new matrix(r);
	}

	this.times = function(o){
		var r = [];
		var a = this.m, b=o.m;
		for(var i = 0; i < a.length; i++){
			r[i] = [];
			for(var j = 0; j < b[0].length; j++){
				r[i][j] = 0;
				for(var k = 0; k < a[i].length; k++){
					r[i][j] = r[i][j] + a[i][k] * b[k][j];
				}
			}
		}
		return new matrix(r);
	} 	
}

var a = new matrix([[3,2,1],[1,2,3]]);
var b = a.transpose();
var c = a.add(a);
var d = a.times(b);
var e = a.transpose().add(b).transpose().times(b); // 鏈式語法

console.log("a = %j", a);
console.log("b = %j", b);
console.log("c = %j", c);
console.log("d = %j", d);
console.log("e = %j", e);

```

請注意，javascript 沒有類別的概念，而是用函數代替，例如上述程式中下列段落中的 matrix 就是一個函數，而且是物件的建構函數。

```javascript
var matrix = function(m) {
  this.m = m;
...
}
...
var a = new matrix([[3,2,1],[1,2,3]]);
```

像是在上述程式中的 a = new matrix([[3,2,1],[1,2,3]]) 這一行中，當我們在函數 matrix 前面加上 new 的時候，javascript 引擎會先建立一個稱為 this 的物件，也就是讓 a={}，接著再執行建構函數，於是在   this.m = m 這一行時，就會讓 a 變成 { m: [[3,2,1],[1,2,3]] } 這樣一個物件。

## 執行結果

```
D:\git\matrix>node omatrix
a = {"m":[[3,2,1],[1,2,3]]}
b = {"m":[[3,1],[2,2],[1,3]]}
c = {"m":[[6,4,2],[2,4,6]]}
d = {"m":[[14,10],[10,14]]}
e = {"m":[[28,20],[20,28]]}
```

