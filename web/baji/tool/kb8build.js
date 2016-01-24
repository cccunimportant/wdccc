// 词频表: http://www.cncorpus.org/resources.aspx
// 簡繁一多對應表https://zh.wikipedia.org/wiki/Wikipedia:Unihan%E7%B9%81%E7%AE%80%E4%BD%93%E5%AF%B9%E7%85%A7%E8%A1%A8/%E7%AE%80%E7%B9%81%E4%B8%80%E5%A4%9A%E5%AF%B9%E5%BA%94%E8%A1%A8


var fs = require("fs");
var readline = require('readline');
var util = require("util");
var lib = require("../lib/lib")
var kb = require("../lib/kb");
var kb8 = require("../lib/kb8");

/* 接著要處理詞性 => 對應到八極語的 8+Q 類
    Noun                            N=N
    Plural                          p
    Noun Phrase                     h=N
    Verb (usu participle)           V=V
    Verb (transitive)               t=V
    Verb (intransitive)             i=V
    Adjective                       A=n=Hn
    Adverb                          v=v=Hv
    Conjunction                     C=
    Preposition                     P=
    Interjection                    !=
    Pronoun                         r=N
    Definite Article                D=n
    Indefinite Article              I=
    Nominative                      o=
*/
var pgList='V=V;t=V;i=V;A=n;v=v;D=n;N=N;h=N;r=N;p=N;C=C;P=c;!=!'.split(';');
var pgMap = { V:'V',t:'V',i:'V',A:'n',v:'v',D:'n',N:'N',h:'N',r:'N',p:'N',C:'C',P:'c','!':'!' };

function p2g(p) {
  var g = pgMap[p[0]];
  if (lib.defined(g)) return g;
  for (var i=0; i<pgList.length; i++) {
    var pg = pgList[i].split("=");
    var p1 = pg[0], g=pg[1];
    if (p.indexOf(p1)>=0) {
      return g;
    }
  }
  return '';
}

function eKbBuild() {
  var eKb = fs.createWriteStream('../kb/eKb.json');
  var e2c = kb.loadDic('../dictionary/e2c.dic', {spliter:'\n', k:0});
  var e2p = kb.loadDic('../dictionary/e2pos.dic', {spliter:'\n', k:0, replace:true });
  var e2cp = fs.createWriteStream('../kb/e2cp.dic');
  eKb.write('{\n');
  for (var e in e2c) {
    var c = kb.getOne(e2c, e);
    var p = kb.getOne(e2p, e);
    if (lib.defined(p)) {
      if (e.match(/^\w+$/)) {
        var g = p2g(p);
        eKb.write(util.format('"%s":{"c":"%s","p":"%s","g":"%s"},\n', e, c, p, g));
        e2cp.write(util.format('%s=%s,%s,%s\n', e, c, p, g));
        if (g === '')
          console.log(util.format('%s=%s,%s,%s\n', e, c, p, g))
      }
    }
  }
  eKb.write('"":{"c":"","p":""}\n}');
  eKb.end();
  e2cp.end();
  console.log("eKbBuild().end()");
}

function cKbBuild() {
return new Promise(function (resolve, reject) {
  console.log("cKbBuild().start()");
  var cKb = fs.createWriteStream('../kb/cKb.json');
  var c2sound = fs.createWriteStream('../kb/c2sound.dic');
  var c2sc = fs.createWriteStream('../kb/c2sc.dic');
  var rd = readline.createInterface({
    input: fs.createReadStream('../dictionary/cedict_ts.u8'),
    output: process.stdout,
    terminal: false
  });
  cKb.write('{\n');
  var cLast;
  rd.on('line', function(line) {
    if (line.startsWith('#')) return;
    var parts = line.split("/");
    var c = parts[0].match(/([^\s]+)\s+([^\s]+)\s+\[(.*)?\]/);
    var e = parts[1].split("/");
    var tc = c[1];
    var sc = c[2];
    var sound = c[3].toLowerCase();
    if (c[1].length===1 && cLast !== c[1]) {
      c2sound.write(util.format('%s=%s\n', tc, sound));
      if (c[1] !== c[2])
      c2sc.write(util.format('%s=%s\n', tc, sc));
      cKb.write(util.format('"%s":{"sc":"%s","s":"%s"},\n', tc, sc, sound));
    }
    cLast = c[1];
  });
  rd.on('close', function() {
    c2sound.end();
    c2sc.end();
    cKb.write('"":{}\n}');
    cKb.end();
    c2sc.on('finish', function() {
      console.log("cKbBuild().end()");
      resolve();
    });
  });
});  
}

function kb8Build() {
  console.log("kb8Build().start()");
  kb8.loadKb();
  console.log("=======> c2e[這]=%s", kb8.tables['c2e']['這']);
  kb8.saveKb();
  console.log("kb8Build().end()");
}

var promise = Promise.resolve();
promise.then(eKbBuild).then(cKbBuild).then(kb8Build); // .then(tc2scBuild)


/*
function tc2scBuild() {
return new Promise(function (resolve, reject) {
  console.log('tc2scBuild() start');
  var c2sc = kb.loadDic('../kb/c2sc.dic', {spliter:'\n', k:0});
  var c2e = kb.loadDic('../kb/c2e.dic', {spliter:'\n', k:0});
  var c2ce = fs.createWriteStream('../kb/cc2e.dic');
  for (var tc in c2e) {
    var e = c2e[tc];
    var sc = tc2sc(c2sc, tc);
    c2ce.write(util.format('%s,%s=%s\n', tc, sc, e));
//    console.log("tc=%s", tc);
  }
  c2ce.end();
  c2ce.on('finish', function() {
    console.log('tc2scBuild() end');
    resolve();
  });
});
}
*/

/*
eKbBuild();
var p1 = new Promise(cKbBuild);
p1.then(tc2scBuild);
*/

// tc2scBuild();

/* 問題
go=t=N
GO=N
go=NVt
...
do=a=N
DO=N
do=VtiN
*/

