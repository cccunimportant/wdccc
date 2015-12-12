# curl -- 檢視 http 協定抓網頁的工具

## curl -v ccc.nqu.edu.tw

```
nqu-192-168-61-142:~ mac020$ curl -v ccc.nqu.edu.tw
* About to connect() to ccc.nqu.edu.tw port 80 (#0)
*   Trying 192.168.61.142...
* connected
* Connected to ccc.nqu.edu.tw (192.168.61.142) port 80 (#0)
> GET / HTTP/1.1
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8y zlib/1.2.5
> Host: ccc.nqu.edu.tw
> Accept: */*
> 
< HTTP/1.1 302 Moved Temporarily
< X-Powered-By: Express
< Location: /web/wikidown.html
< Vary: Accept
< Content-Type: text/plain; charset=utf-8
< Content-Length: 52
< set-cookie: connect.sid=s%3A2BqPKS2J9N3npk8cIdSnGN5TvEPCrNYL.Vhg%2FXZX0XRqrKu0gpay0XjbOb6j2Apj4JDDIQ%2FhTBhA; Path=/; Expires=Wed, 08 Apr 2015 00:02:55 GMT; HttpOnly
< Date: Tue, 07 Apr 2015 00:02:55 GMT
< Connection: keep-alive
< 
* Connection #0 to host ccc.nqu.edu.tw left intact
Moved Temporarily. Redirecting to /web/wikidown.html* Closing connection #0
```

## curl ccc.nqu.edu.tw -I

```
nqu-192-168-61-142:~ mac020$ curl ccc.nqu.edu.tw
Moved Temporarily. Redirecting to /web/wikidown.htmlnqu-192-168-61-142:~ mac020$
```

## curl ccc.nqu.edu.tw -I

```
nqu-192-168-61-142:~ mac020$ curl ccc.nqu.edu.tw -I
HTTP/1.1 302 Moved Temporarily
X-Powered-By: Express
Location: /web/wikidown.html
Vary: Accept
Content-Type: text/plain; charset=utf-8
Content-Length: 52
set-cookie: connect.sid=s%3A1brD7Iqvu3cSg4FMXrpfhaqaa3nBXxdW.z4qcdVwkC1kSu20kpWwMsJYvDsPC96CBEB8rxIxLbEY; Path=/; Expires=Tue, 07 Apr 2015 23:54:51 GMT; HttpOnly
Date: Mon, 06 Apr 2015 23:54:51 GMT
Connection: keep-alive
```

## curl ccc.nqu.edu.tw/web/wikidown.html -I

```
nqu-192-168-61-142:~ mac020$ curl ccc.nqu.edu.tw/web/wikidown.html -I
HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Date: Mon, 06 Apr 2015 23:54:31 GMT
Cache-Control: public, max-age=0
Last-Modified: Mon, 06 Apr 2015 05:06:21 GMT
ETag: W/"3066-221668767"
Content-Type: text/html; charset=UTF-8
Content-Length: 12390
set-cookie: connect.sid=s%3AtMcXEjAdIonz2TTr1BFhEXGluIB53tid.PGnUCxsns7wcVyiGmi2GgzO4mLsAvM%2Bt%2FPCkUiEIfzc; Path=/; Expires=Tue, 07 Apr 2015 23:54:31 GMT; HttpOnly
Connection: keep-alive
```

## curl ccc.nqu.edu.tw/web/wikidown.html

```
<html>
<head>
  <meta charset="utf-8" />
  <link href="favicon.ico" rel="icon">
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/highlight.default.min.css" rel="stylesheet">
  <link href="css/fileinput.css" media="all" rel="stylesheet"/>
  <link href="wikidown.css" rel="stylesheet">
  <title>Wikidown</title>
</head>
<body onload="init()">
....
<script src="js/Showdown/Showdown.js"></script>
<script src="js/Showdown/extensions/table.min.js"></script>
<script src="js/Showdown/extensions/mathjax.js"></script>
<script src="js/highlight.min.js"></script>
<script src="js/fileinput.js" type="text/javascript"></script>
<script src="config.js"></script>
<script src="MathJax/MathJax.js?config=TeX-AMS-MML_SVG"></script>
</body>
</html>
```

