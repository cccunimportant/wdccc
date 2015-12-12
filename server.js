var fs      = require('fs');
var http    = require('http');
var http    = require('http');
var https   = require('https');
var c       = console;
var url     = require('url');
var mzfs    = require('mz/fs');
var koa     = require('koa');
var send    = require('koa-send');
var path    = require('path');
var bodyParser = require("koa-bodyparser"); // 參考：http://codeforgeek.com/2014/09/handle-get-post-request-express-4/
var session = require('koa-session');
var serveIndex = require('koa-serve-index');
var route   = require('koa-route');
var parse   = require('co-busboy');
var saveTo  = require('save-to');
var wdlib   = require('./wdlib');
var setting = require('./setting');
var config  = require('./config');
var passwords = setting.passwords;

var app = koa();
var webDir = __dirname;
var dbRoot = path.join(__dirname, 'db');
var staticTemplate = fs.readFileSync(webDir+"/static.html", "UTF-8");
// c.log(wdHtml);
c.log("dbRoot=%s", dbRoot);
app.keys = ['@#$TYHaadfa1'];
app.use(session(app));
app.use(bodyParser({formLimit:5*1000*1000, jsonLimit:5*1000*1000}));

function response(res, code, msg) {
  res.status = code;
  res.set({'Content-Length':''+msg.length,'Content-Type':'text/plain'});
  res.body = msg;
  c.log("response: code="+code+"\n"+msg+"\n");
}

function isPass(req) {
  c.log("loginToSave="+setting.loginToSave);
  if (setting.loginToSave === false) 
    return true;
  c.log('req.session.user='+req.session.user);
  return typeof(req.session.user)!=='undefined';
}

// 處理檔案上傳 : multipart upload
app.use(function *(next){
  var domain = this.request.url.split("/").pop();
  if ('POST' !== this.request.method) return yield next;
  if (!this.request.url.startsWith('/upload/')) return yield next;
  if (!this.request.header["content-type"].startsWith("multipart/form-data;")) return yield next;
  var part, parts = parse(this);
  var files = [], file;
  while (part = yield parts) {
    console.log('part=%j', part);
    if (typeof part.filename !== 'undefined') {
      files.push(file = path.join(dbRoot, domain, part.filename));
      console.log('uploading %s -> %s', part.filename, file);
      yield saveTo(part, file);
    }
  }
  this.body = files;
});

app.use(route.get('/', function*() {
  this.redirect('wd.html#main:home');
}));

var mime = { ".js":"application/javascript", ".css": "text/css", ".html": "text/html", ".htm":"text/html", ".jpg":"image/jpg", ".png":"image/png", ".gif":"image/gif", ".pdf":"application/pdf"};

function fileMimeType(path) {
  for (var tail in mime) {
    if (path.endsWith(tail))
      return mime[tail];
  }
}

app.use(route.get(/.*/, function *toStatic() {
	if (!this.path.startsWith("/setting.js")) {
    var mimetype = fileMimeType(this.path)
    if (mimetype) this.type = mimetype+";";
    c.log('get %s', this.path);   
    this.body = mzfs.createReadStream(__dirname+this.path);
	}
}));

app.use(route.post('/wd/:domain/:file', function*(domain, file) {
  var req = this.request, res = this.response;
  var wd = this.request.body.obj;
  if (!isPass(this)) {
    response(res, 401, 'Please login to save!')
    return;
  }
  c.log('post %s:%s', domain, file)
  // 寫入檔案 （通常是 *.wd 檔案）
  yield mzfs.mkdir(dbRoot+"/"+domain+"/").catch(function(){});
  yield mzfs.writeFile(dbRoot+"/"+domain+"/"+file+".wd", wd).then(function() {
    response(res, 200, 'write success!');
  }).catch(function() {
    response(res, 403, 'write fail!'); // 403: Forbidden
  });  
  var html = wdlib.wd2staticHtml(wd, domain, config.title[domain], staticTemplate);
/*  
  // 將 *.wd 轉為 *.html 後寫入
  var title = config.title[domain];
  var titleHtml = wdlib.wd2html(config.title[domain], domain, {isHash:false});
  var wdHtml = wdlib.wd2html(wd, domain, {isHash:false});
  var html = staticTemplate.replace("{%=wdHtml%}", wdHtml).replace("{%=titleHtml%}", titleHtml).replace("{%=title%}", title);
*/  
  yield mzfs.writeFile(dbRoot+"/"+domain+"/"+file+".html", html);
}));

// 以下為 https 版本，必較不容易被竊取密碼，但是有 self signed 的認證問題
// 目前設定只有 https 版本可以登入並修改資料，http 版不行。
// var secureApp = app;

var secureApp = app;

secureApp.use(route.post("/login", function*() {
  var req = this.request, res = this.response;
  var p = this.request.body;
  if (req.protocol !== 'https') {
    response(res, 401, p.user+":login fail!");
    return;
  }  
  if (p.user in passwords && passwords[p.user].toUpperCase() === p.password.toUpperCase()) {
    this.session.user = p.user;
    response(res, 200, p.user+":login success!");
  } else {
    response(res, 401, p.user+":login fail!");
  }
}));

secureApp.use(route.post("/logout", function*() {
  var req = this.request, res = this.response;
  this.session = null;
  response(res, 200, "logout success!");
}));

var port = process.env.PORT || 80; // process.env.PORT for Heroku

console.log('Server started: http://localhost:'+port);

http.createServer(app.callback()).listen(port);

var sslPort = 443;
https.createServer({
      key: mzfs.readFileSync('key.pem'),
      cert: mzfs.readFileSync('cert.pem'),
      // 以下只有 self signed 認證的方式需要
      requestCert: true, 
      ca: [ mzfs.readFileSync('csr.pem') ]
}, app.callback()).listen(sslPort);

console.log('Http Server started: http://localhost:'+sslPort);
