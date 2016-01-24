var fs = require("fs");
var lib = require("./lib");

var kb = {};

kb.getOne = function(dic, key) {
  var hits = kb.getHits(dic, key);
  if (lib.defined(hits))
    return hits[0];
}

kb.getHits = function(dic, key) {
  var hits = dic[key];
  if (hits instanceof Array)
    return hits;
}

kb.add = function(dic, key, value, where) {
  var hits = kb.getHits(dic, key);
  if (!lib.defined(hits)) 
    dic[key] = [ value ];
  else if (hits instanceof Array){
    if (hits.indexOf(value)<0) {
      if (lib.defined(where) && where === 'first')
        hits.unshift(value);
      else
        hits.push(value);
    }
  } else if (typeof hits !== 'function'){ // 排除 o.constructor=function() {} 這些預設函數
    console.log('kb.add key=%s hits.type=%s', key, typeof hits);
    throw Error('kb.add'); 
  }
}

// 範例 text: a1,a2...=b1,b2,...;c=d;... spliter:; k:0 
kb.text2dic = function(text, options) {
  var opt = lib.defaultTo(options, {});
  var k   = lib.defaultTo(opt.k, 0);
  var kfilter = lib.defaultTo(opt.kfilter, null);
  var vfilter = lib.defaultTo(opt.vfilter, null);
  var spliter = lib.defaultTo(opt.spliter, '\n');
  var keyLower = lib.defaultTo(opt.keylower, true);
  var replace = lib.defaultTo(opt.replace, false);
  var dic = {};
  var lines = text.split(spliter);
  for (var i=0; i<lines.length; i++) {
    var line = lines[i].trim();
    if (line.match(/=.*?=/)) {  // mobyposi.i 有些錯， 像 Set=bal=N, 濾掉
      console.log("Error:line %d, ignore %s", i+1, line);
      continue;
    }
    if (line === '') continue;
    var pair = line.split("=");
    var head = pair[0];
    var tail = lib.defaultTo(pair[1], '');
    var keys = head.split(",");
    var values = tail.split(",");
    if (k===1) {
      var t = keys;
      keys = values;
      values = t;
    }
    for (var ki=0; ki< keys.length; ki++) {
      if (kfilter !== null && kfilter.indexOf(ki)<0) continue;
      var key   = keys[ki].trim();
      if (keyLower) key=key.toLowerCase();
      for (var vi=0; vi<values.length; vi++) { // 注意：不能改成 for (in)，因為取出的是字串，不是整數
        var value = values[vi].trim();
        if ((vfilter !== null) && (vfilter.indexOf(vi)<0)) continue;
        if (key === value) continue;
        if (replace && lib.defined(kb.getOne(dic, key))) {
          dic[key] = [ value ];
        } else
          kb.add(dic, key, value);
      }
    }
  }
  return dic;
}

kb.loadDic = function(fileName, options) {
  var fileText = fs.readFileSync(fileName, 'UTF-8');
  return kb.text2dic(fileText, options);
}

// 尚未測試
/*
kb.saveDic = function(dic, options) {
  var text = '';
  for (var key in dic) {
    var hits = dic[key];
    if (hits instanceof Array) {
      text += hits.join(',')+'\n';
    }
  }
  return text;
}
*/

module.exports = kb;