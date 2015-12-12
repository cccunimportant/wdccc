a=[1,2,3]
b=[2,2,2]

var vadd = function(x,y) {
  var r=[];
  for (var i=0; i<x.length; i++)
    r[i] = x[i]+y[i];
  return r;
}

d=vadd(a,b);

console.log("a="+a);
console.log("b="+b);
console.log("d="+d);