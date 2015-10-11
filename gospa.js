function gospa() {
  var m=window.location.pathname.match(/\/db\/(\w+)\/(\w+)\.html/);
  window.location.href = 'http://'+window.location.host+'/wd.html#'+m[1]+':'+m[2];
}

gospa();
