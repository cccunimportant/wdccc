
function squareRoot(n) {
  if (n<1) 
    throw "Error: n should > 1, n="+n+" now!";
  else {
    root = 1;
    while (root < n) {
      if (root*root >= n) {
        return root;
      } else {
        root = root + 0.01;
      }
      console.log("root=%d", root);
    }
  }
}

console.log("squareRoot(5)=%d", squareRoot(5));

console.log("squareRoot(0.2)=%d", squareRoot(0.2));
