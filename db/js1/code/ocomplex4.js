var Complex = {
  add:function(c2) {
    return Complex.create(this.r+c2.r, this.i+c2.i);
  },
  sub:function(c2) {
    return Complex.create(this.r-c2.r, this.i-c2.i);
  },
  mul:function(c2) {
    return Complex.create(this.r*c2.r-this.i*c2.i, 
                       this.r*c2.i+this.i*c2.r);
  },
  toString:function() { 
    return this.r+"+"+this.i+"i" 
  }
}

Complex.create=function(r,i) {
  var c = Object.create(Complex);
  c.r = r;
  c.i = i;
  return c;
}

var c = console;

var c1=Complex.create(1,2), c2=Complex.create(2,1);

var c3 = c1.add(c2).sub(c2).add(c2).sub(c2);

c.log("c1=%s", c1);
c.log("c2=%s", c2);
c.log("c1.add(c2)=%s", c1.add(c2));
c.log("c1.sub(c2)=%s", c1.sub(c2));
c.log("c1.mul(c2)=%s", c1.mul(c2));
c.log("c3=%s", c3);
