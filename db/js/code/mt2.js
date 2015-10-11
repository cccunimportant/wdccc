var log = console.log;

var dic = { dog:"狗", cat:"貓", a: "一隻", chase:"追", eat:"吃",
            "狗":"dog", "貓":"cat", "一隻":"a", "追":"chase", "吃":"eat" };

function mt(w) {
  var array = [];
  for (i in w) {
    var word = w[i];
    var toWord = dic[word];
    array.push(toWord);
  }
  return array;
}

var a = mt(process.argv.slice(2));
log(a);