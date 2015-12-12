var http = require('http'),
  fs = require("fs"),
  url = require('url');

var server = http.createServer(function (req, res) {
  var path = url.parse(req.url);
  var home = ".";
  console.log("pathname="+path.pathname);
  fs.readFile(home+path.pathname, "UTF-8", function(err, file) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end();
        return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(file);
	  console.log(file);
    res.end();
  });
});

server.listen(3000);

console.log("Server running at http://localhost:3000");