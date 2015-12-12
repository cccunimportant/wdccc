# 矩陣運算(原型版)

檔案: pmatrix.js

```javascript
var matrix = function(m) {
  this.m = m;
}

matrix.prototype.transpose = function(){
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

matrix.prototype.add = function(o){
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

matrix.prototype.times = function(o){
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

當 javascript 在物件裡搜尋不到某變數時，會進一步到原型 （prototype) 裡面去找，而這也是為何上述程式可以成功執行的原因。

每個函數裡面都有個 prototype，而 prototype 裡還可以有 prototype，因此會形成原型鏈 (prototype chain) .

## 執行結果

```
D:\git\matrix>node pmatrix
a = {"m":[[3,2,1],[1,2,3]]}
b = {"m":[[3,1],[2,2],[1,3]]}
c = {"m":[[6,4,2],[2,4,6]]}
d = {"m":[[14,10],[10,14]]}
e = {"m":[[28,20],[20,28]]}
```
