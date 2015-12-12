var fs    = require('fs');
var walk  = require('walk');
var wdlib = require('./wdlib');
var config= require('./config');
var c     = console;
var dir;

var staticTemplate = fs.readFileSync("static.html", "UTF-8");

function wd2htmlFile(wdFile, wdPath) {
  wdPath = wdPath.replace('\\', '/');
  var domain = wdPath.match(/\/([^\/]+)$/)[1];
  var wd = fs.readFileSync(wdPath+'/'+wdFile, 'utf8');
/*  // 轉換 wd 為 md 後存檔
  var md  = wd2md(wd, domain);
  var mdFile = wdFile.replace(/\.wd$/, '.md');
  fs.writeFileSync(wdPath+'/'+mdFile, md, 'utf8');  
*/  
  // 轉換 wd 為 html 後存檔
  var html = wdlib.wd2staticHtml(wd, domain, config.title[domain], staticTemplate);
  var htmFile = wdFile.replace(/\.wd$/, '.html');
  fs.writeFileSync(wdPath+'/'+htmFile, html, 'utf8');
//  console.log("wdPath=%s wd=%s html=%s", wdPath, wd, html);
}

if (process.argv.length > 2) {
  var domain = process.argv[2];
  dir = 'db/'+domain;
} else
  dir = 'db';

var walker  = walk.walk(dir, { followLinks: true });

walker.on('file', function(dir, stat, next) {
  try {
    var file = stat.name;
    if (file.indexOf('.wd') >= 0 && file.indexOf('*') < 0) {
      c.log('file='+file+' dir='+dir);
      wd2htmlFile(file, dir);
    }
  } catch(err) { c.log("error!") }
  next();
});

walker.on('end', function() {});

