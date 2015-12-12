var c = console;

function arrayIterator(array){
  var i = 0;
  return {
    next: function(){
      return i < array.length ?
        {value: array[i++], done: false} :
        {value: undefined, done: true};
    }
  }
}

var ai = arrayIterator(['x', 'y', 'z']);

c.log(ai.next()); // { value: "x", done: false }
c.log(ai.next()); // { value: "y", done: false }
c.log(ai.next()); // { value: "z", done: false }
c.log(ai.next()); // { value: undefined, done: true }


/*

while (true) {
	var item = ai.next();
	if (item.done === true)
		break;
  c.log(item);
}

*/