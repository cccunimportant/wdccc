// === BNF Grammar =====
// E = T [+-*/] E | T
// T = [0-9] | (E)

function print(s) {
	process.stdout.write(s);
}

// 用法:randInt(3,7) 會傳回 3,4,5,6,7 其中之一
function randInt(a, b) { // 隨機傳回一個介於 (a,b) 間的整數 (包含 a, b)
	return Math.floor((Math.random() * (b-a+1)) + a);
}

function randChar(str) {
  var len = str.length;
  var i = randInt(0, len-1);
  return str[i];
}

function E() {
	if (randInt(1,10) <= 5) {
		T(); print(randChar("+-*/")); E();
	} else {
		T();
	}
}

function T() {
	if (randInt(1,10) < 7) {
		print(randChar("0123456789"));
	} else {
		print("("); E(); print(")");
	}
}

for (var i=0; i<10; i++) {
	E();
	print("\n");
}

