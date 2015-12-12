var http = require('http'), 
    url = require('url'),
    qs = require('querystring'),
    s = require("./staticServer");

var server = http.createServer(function (req, res) {
  var path = url.parse(req.url);
  if (path.pathname==="/form/get") {
    parameter = qs.parse(path.query);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write("path="+JSON.stringify(path,null,2)+"\n\n");
    res.write("parameter="+JSON.stringify(parameter,null,2)+"\n");
    res.end();
  } else {
    s.staticServer(req, res);
  }
});

server.listen(3000);

console.log("Server running at http://localhost:3000");