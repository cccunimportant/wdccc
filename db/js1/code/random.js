
function randBetween(a,b) {
  return a+Math.random()*(b-a);
}

function randInt(a,b) {
  return Math.floor(randBetween(a,b));
}

function repeats(n, f) {
  var a = [];
  for (var i=0; i<n; i++) {
    a.push(f());
  }
  return a;
}

var rList = repeats(10, function() {
  var r=randInt(0,2);
  console.log("r="+r);
  return r;
});

console.log("rList=%j", rList);
