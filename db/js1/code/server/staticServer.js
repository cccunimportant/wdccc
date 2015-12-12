var http = require('http'),
  fs = require("fs"),
  url = require('url');

var mimeType = {
  "jpg":"image/jpeg", 
  "gif":"image/gif", 
  "png":"image/png", 
  "svg":"image/svg",
  "zip":"application/zip", 
  "pdf":"application/pdf", 
  "xls":"application/vnd.ms-excel", 
  "ppt":"application/vnd.ms-powerpoint", 
  "doc":"application/msword", 
  "js" :"text/javascript", 
  "css":"text/css", 
  "htm":"text/html", 
  "html":"text/html"
};
  
var response = function(res, code, type, data) {
	res.writeHead(code, {'Content-Type': type});
	if (type.indexOf("text/")>=0)
		res.end(data);
	else
		res.end(data, "binary");
}

var staticServer=function(req, res) {
  var path = url.parse(req.url);
  var home = ".";
  fs.readFile(home+path.pathname, function(err, file) {
    if (err) {
      response(res, 404, 'text/plain', '404 not found!');
      return;
    }
    var parts = path.pathname.split(".");
    var tail  = parts[parts.length-1];
    var mime = mimeType[tail];
    response(res, 200, mime, file);
  });
}

module.exports = { staticServer:staticServer, response:response }

  
