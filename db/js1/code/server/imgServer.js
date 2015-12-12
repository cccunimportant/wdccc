var http = require('http'),
  fs = require("fs"),
  url = require('url');

var response = function(res, code, type, data) {
	res.writeHead(code, {'Content-Type': type});
	if (type.indexOf("text/")>=0)
		res.end(data);
	else
		res.end(data, "binary");
}
  
var server = http.createServer(function (req, res) {
  var path = url.parse(req.url);
  var home = ".";
  console.log("pathname="+path.pathname);
  fs.readFile(home+path.pathname, function(err, file) {
    if (err) {
      response(res, 404, 'text/plain', '404 not found!');
      return;
    }
    if (path.pathname.endsWith(".jpg")) {
      response(res, 200, "image/jpeg", file);
    } else {
      response(res, 200, "text/html", file);
    }
  });
});

server.listen(3000);

console.log("Server running at http://localhost:3000");