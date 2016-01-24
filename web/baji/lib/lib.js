var lib = {};

lib.replace = function(str, a, b) {
  return str.split(a).join(b);
}

lib.defined = function(variable) {
  return typeof variable !== 'undefined';
}

lib.defaultTo = function(variable, defaultValue) {
  return (variable?variable:defaultValue);
}

lib.clone=function(o) {
  if (typeof o === 'undefined') return {};
  return JSON.parse(JSON.stringify(o));  
}

lib.merge=function(o1, o2) {
  var o = lib.clone(o1);
  for (var key in o2) {
    if (typeof o1[key] === 'undefined')
      o[key] = o2[key];
  }
  return o;
}

lib.list=function(o, keys) {
  var a = [];
  for (var i in keys) {
    a.push(o[keys[i]]);
  }
  return a;
}

module.exports = lib;

/*
function hitJoin(dictHit, dictObj) {
  var dictJoin = {};
  for (var x in dictHit) {
    var list = dictHit[x];
    for (var i in list) {
      var y = list[i];
      if (typeof dictJoin[y] === "undefined") {
        dictJoin[y] = [];
      }
      dictJoin[y].push(dictObj[x]);
    }
  }
  return dictJoin;
}


function hitReverse(dictHit) {
  var dictRev = {};
  for (var x in dictHit) {
    var list = dictHit[x];
    for (var i in list) {
      var y = list[i];
      if (typeof dictRev[y] === "undefined") {
        dictRev[y] = [];
      }
      dictRev[y].push(x);
    }
  }
  return dictRev;
}

*/