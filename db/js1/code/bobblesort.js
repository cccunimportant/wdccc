
function bobbleSort(a) {
	for (var i=0; i<a.length; i++) {
		for (var j=0; j<i; j++) {
			if (a[i]<a[j]) {
				var t=a[i];
				a[i] = a[j];
				a[j] = t;
			}
		}
	}
}

var x = [ 3, 9, 2, 7, 1, 8, 5, 6];

console.log("x=%j", x);

bobbleSort(x);

console.log("x=%j", x);

