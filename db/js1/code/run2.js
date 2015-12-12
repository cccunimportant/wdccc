function run2(f1, x, f2) {
  var fx = f1(x);
  f2(fx);
}

run2(Math.sin, Math.PI/4, console.log);