function* HelloGen2() {
  var a = yield 100;
  console.log("a="+a);
  var b = yield a + 100;
  console.log("b="+b);
}
 
var gen2 = HelloGen2();
 
console.log(gen2.next());     // {value: 100, done: false}
console.log(gen2.next(500));  // {value: 600, done: false}
console.log(gen2.next(1000)); // {value: undefined, done: true}
