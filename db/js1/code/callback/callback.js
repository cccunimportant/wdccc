function sum(n) {
  var i, s=0;
  for (i=1; i<=n; i++)
    s = s+i;
  return s;
}

function sum_async(n, callback) {
  var i, s=0;
  for (i=1; i<=n; i++)
    s = s+i;
  callback(s);
  return s;
}

console.log("sum(10)="+sum(10));

function sum_callback(total) {
  console.log("sum_callback:total="+total);
}

sum_async(10, sum_callback);

sum_async(10, function sum_callback2(total) {
  console.log("sum_callback2:total="+total);
});

sum_async(10, function (total) {
  console.log("1+...+10=total="+total);
});



