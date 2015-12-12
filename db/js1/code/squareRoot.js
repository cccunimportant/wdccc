
function squareRoot(n) {
  if (n<=1) 
    throw "Error: n should > 1, n="+n+" now!";
  else {
    var low = 1;
    var high = n;
    var mid;
    while (true) {
      mid = (low+high)/2;
      console.log("mid=%d", mid);
      if (Math.abs(mid*mid-n) < 0.01) {
        return mid;
      }
      if (mid*mid > n)
        high = mid;
      else
        low = mid;
    }
  }
}

console.log("squareRoot(5)=%d", squareRoot(5));

console.log("squareRoot(0.2)=%d", squareRoot(0.2));
