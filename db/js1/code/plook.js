/* 
用法:
$ node plook 陳鍾誠

姓名： 陳鍾誠
年齡： 46
電話： 082313534
email : ccckmit@gmail.com
*/

var peoples = { 
  "陳鍾誠": { age: 46, tel:"082313534", email:"ccckmit@gmail.com"}, 
  "史奴比": { age: 3,  tel:"888888888", email:"snoopy@gmail.com"}
};

function lookup(name) {
  var p = peoples[name];
  if (typeof p === "undefined") {
    console.log("找不到");
  } else {
    console.log("姓名:%s\n年齡:%d\n電話:%s\nemail:%s\n", name, p.age, p.tel, p.email);
  }
}

lookup(process.argv[2]);

