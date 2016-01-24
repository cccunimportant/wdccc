var fs  = require("fs");
var kb8 = require("../lib/kb8");
var mt8 = require("../lib/mt8");

var text= fs.readFileSync(process.argv[2], 'UTF-8');

kb8.loadKb();

var toText = mt8.translate(text, 'ruby_st', 'html');
console.log("%s", toText);
