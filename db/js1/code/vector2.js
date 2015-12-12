a=[1,2,3]
b=[2,2,2]


var Vector = {
  v : [ 1,2,3 ]
};

Vector.add = function(y) {
  for (var i=0; i<y.length; i++)
    this.v[i] = this.v[i]+y[i];
  return this;
}

Vector.toString = function() {
  var s = "[";
  for (var i=0; i<this.v.length; i++)
    s = s+this.v[i]+" ";
  return s.trim()+"]";
}


console.log("Vector="+Vector);
Vector.add(b);
console.log("b="+b);
console.log("Vector="+Vector);