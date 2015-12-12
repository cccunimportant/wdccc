var c = console;

function *gen1(array){
	var a=5, b=3;
	yield "x";
	c.log("a=%d", a);
	yield "y";
	b = a+b;
	c.log("b=%d", b);
	return "z";
}

var g1 = gen1();

c.log(g1.next()); // { value: "x", done: false }
c.log(g1.next()); // { value: "y", done: false }
c.log(g1.next()); // { value: "z", done: true }
c.log(g1.next()); // { value: undefined, done: true }


/*

while (true) {
	var item = ai.next();
	if (item.done === true)
		break;
  c.log(item);
}

*/