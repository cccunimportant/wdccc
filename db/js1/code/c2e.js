var log = console.log;

var dic = { "狗":"dog", "貓":"cat", "一隻":"a", "追":"chase", "吃":"eat" };

function mt(s) {
  var array = [];
  for (var i=0; i<s.length; i++) {
    for (var len=4; len>0; len--) {
      var str = s.substr(i, len);
      var toWord = dic[str];
      if (typeof toWord !== "undefined") {
        array.push(toWord);
        break;
      }
    }
  }
  return array;
}

var a = mt(process.argv[2]);
log(a);