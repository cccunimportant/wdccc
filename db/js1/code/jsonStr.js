
var obj = { ccc: { name: "陳鍾誠", age:46, tel:"082313534" }, snoopy: { type:"dog", age:3 } };

var objStr = JSON.stringify(obj);

console.log("objStr=%s", objStr);

var obj2 = JSON.parse(objStr);

console.log("obj2=%j", obj);

var objStr2 = JSON.stringify(obj, null, 2);

console.log("objStr2=%s", objStr2);

