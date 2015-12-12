var log = console.log;

function df(f, x) {
  var dx = 0.001;
  var dy = f(x+dx) - f(x);
  return dy/dx;
}

function square(x) {
  return x*x;
}

log('df(x^2)='+df(square, 2));
