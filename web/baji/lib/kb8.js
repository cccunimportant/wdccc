var fs = require("fs");
var util = require("util");
var kb = require("./kb");
var lib = require("./lib");

var kb8 = {};

kb8.loadJson=function(tables) {
  this.tables = tables;
}

kb8.loadKb=function() {
  var e2cpText=fs.readFileSync("../kb/e2cp.dic", 'UTF-8');
  var tables = {};
  tables.e2c = kb.text2dic(e2cpText, {vfilter:[0]});
  tables.e2p = kb.text2dic(e2cpText, {vfilter:[2]});
/*  
  var cc2eText=fs.readFileSync("../kb/c2e.dic", 'UTF-8');
  var tc2e = kb.text2dic(cc2eText, {kfilter:[0]});
  var sc2e = kb.text2dic(cc2eText, {kfilter:[1]});  
  tables.c2e = lib.merge(tc2e, sc2e);
*/  
  tables.c2e = kb.loadDic("../kb/c2e.dic");
  tables.c2sound = kb.loadDic("../kb/c2sound.dic");
  tables.c2sc = kb.loadDic("../kb/c2sc.dic");
  this.tables = tables;
}

kb8.saveKb=function() {
  fs.writeFileSync("../kb/kb8.json", "var kb8json="+JSON.stringify(this.tables, null, 0), "UTF-8");
}

kb8.getHits=function(tableName, key) {
  var table = this.tables[tableName];
  if (!lib.defined(table)) throw Error('getHits:tableName('+table+') not found');
  var o = table[key];
  return o?o:[];
}

kb8.getOne=function(tableName, key) {
  return this.getHits(tableName, key)[0];
}

module.exports = kb8;
