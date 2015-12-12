var http = require('http'), 
    url = require('url'),
    qs = require('querystring'),
    s = require("./staticServer");

var server = http.createServer(function (req, res) {
  var path = url.parse(req.url);
  if (path.pathname==="/form/post") {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    formData = '';
    req.on("data", function(data) {
      return formData += data;
    });
    req.on("end", function() {
      res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
      post = qs.parse(formData);
      console.log("post="+JSON.stringify(post,null,2)+"\n");
      user = post.user;
      password = post.password;
      title = decodeURIComponent(post.title);
      text  = decodeURIComponent(post.text);
      res.write("user="+user+"<br/>");
      res.write("password="+password+"<br/>");
      res.write("title="+title+"<br/>");
      res.write("text="+text+"<br/>");
      res.end();
    });    
  } else {
    s.staticServer(req, res);
  }
});

server.listen(3000);

console.log("Server running at http://localhost:3000");