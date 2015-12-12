'use strict';
var c = console;
var fs = require("fs");
var wdlib = require("./wdlib");
var domain = process.argv[2];
var path = 'db/'+domain;
var bookFile = path+'/book.top';
var bookText = fs.readFileSync(bookFile, 'utf8');
c.log("bookText="+bookText);
var outText = '';
var lines = bookText.split('\n');
for (var i in lines) {
  var tokens = lines[i].split(':')
  var head = tokens[0].trim();
  if (head === 'file') {
    c.log('line='+lines[i]);
    var wdFile = tokens[1].trim()+'.wd';
    c.log('wdFile='+wdFile);
    var wdText = fs.readFileSync(path+'/'+wdFile, 'utf8');
    var mdText = wdlib.wd2md(wdText, domain);
    outText += mdText+'\n';
  } else {
    outText += lines[i]+'\n';
  }
}
// c.log(outText);
fs.writeFileSync(path+'/book.md', outText);
