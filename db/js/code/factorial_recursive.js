function f(n) {
	if (n<=0) {
		console.log("error:n should > 0");
		return;
	}
	if (n===1) 
		return 1;
	else 
		return n*f(n-1);
}

console.log("f(10)=%d", f(10));

console.log("f(0)=%d", f(0));