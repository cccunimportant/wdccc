var userB = {
  sayHello: function() {
    console.log('Hello '+ this.name);
  }
};

var bob = Object.create(userB, { id : { value:0}, name: {value:'Bob'}} );

/*
var bob = Object.create(userB, {
  'id' : {
    value: 0,
    enumerable:true // writable:false, configurable(deletable):false by default
  },
  'name': {
    value: 'Bob',
    enumerable: true
  }
});
*/

bob.sayHello();