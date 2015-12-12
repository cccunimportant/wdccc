function add(c1, c2) {
  return { r:c1.r+c2.r, i:c1.i+c2.i };
}

function sub(c1, c2) {
  return { r:c1.r-c2.r, i:c1.i-c2.i };
}

function mul(c1, c2) {
  return { r:c1.r*c2.r-c1.i*c2.i, 
           i:c1.r*c2.i+c1.i*c2.r };
}

function toStr(c) { 
  return c.r+"+"+c.i+"i";
}

var o1 = { r:1, i:2 }, o2={ r:2, i:1 };

var add12 = add(o1, o2);
var sub12 = sub(o1, o2);
var mul12 = mul(o1, o2);

var c = console;

c.log("o1=%s", toStr(o1));
c.log("o2=%s", toStr(o2));
c.log("add(c1,c2)=%s", toStr(add12));
c.log("sub(c1,c2)=%s", toStr(sub12));
c.log("mul(c1,c2)=%s", toStr(mul12));
