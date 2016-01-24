// facebook 留言板前置區塊
/*
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.4&appId=1556392457962507";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/
$('.panel').css( "display", "none");

var domain, file; // filepath, 
var wdNewFile = '# 標題：文件不存在\n\n您可以編輯後存檔！\n## 語法\n* [[內部連結]](innerLink)\n* [外部連結](link)';

function isLogin() {
  if (localStorage.wd_login !== "true") { // 注意：sessionStorage 不能跨頁面持續，所以得用 localStorage
    alert('未登入無法存檔上傳，請先登入!');
    login();
    return false;
  }
  return true;
}

Server = {
  timeout : 4000
};

Server.save=function(domain, file, doc) {
  $.ajax({
    type: "POST",
    url: "/wd/"+domain+"/"+file,
    timeout: this.timeout,
    data: { obj: doc },
		statusCode: {
      401: function() { // 401:Unauthorized
        localStorage.wd_login = "false";
        isLogin();
      }
    }
  })
  .done(function(data) {
    alert( "存檔完成!");
  })
  .fail(function() {
    alert( "存檔失敗！" );
  });
}

Server.load=function(domain, file) {
  return $.ajax({
    type: "GET",
    url: "db/"+domain+"/"+file+".wd",
    timeout: this.timeout,
    data: {}
  });
}

Server.login=function() {
  $.ajax({
    type: "POST",
    url: "/login",
    timeout: this.timeout,
    data: { user:$('#loginUser').val(), password:$('#loginPassword').val() },
  })
  .done(function(data) {
    localStorage.wd_login = "true";
    alert( "登入成功!");
    $('#loginPassword').val('');
    edit();
  })
  .fail(function() {
    localStorage.wd_login = "false";
    alert( "登入失敗！" );
    login();
  });
}

Server.logout=function() {
  $.ajax({
    type: "POST",
    url: "/logout",
    timeout: this.timeout,
    data: {},
  })
  .done(function(data) {
    localStorage.wd_login = "false";
    alert( "登出成功!");
    show();
  })
  .fail(function() {
    alert( "登出失敗！" );
  });
}

window.onhashchange = function () {
  filepath = window.location.hash.substring(1);
  var parts  = filepath.split(':'); // domain:file
  loadFile(parts[0], parts[1], {isAjax:true}); // parts[0]=domain, parts[1]=file
}

window.onbeforeunload = function(){}

var isHash;

function init() {
//  if (window.location.hash === '')
//    window.location.hash = '#main:home';
  var m = window.location.pathname.match(/\/db\/([^\/]+)\/([^\/]+)\.html/);
  if (m !== null) {
    isHash = false;
    loadFile(m[1], m[2]);
//    window.location.hash = '#'+m[1]+':'+m[2];
  } else {
    isHash = true;
    window.onhashchange();
  }
  if (window.location.protocol === 'https:') {
    $('#menuLogin').removeClass('hide');
    $('#menuEdit').removeClass('hide');
  }
  MathJax.Hub.Config({
      extensions: ["tex2jax.js"],
      jax: ["input/TeX", "output/HTML-CSS"],
			displayAlign: "left",
      tex2jax: {
        inlineMath: [ ['$','$'], ["\\(","\\)"] ],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true
      },
      "HTML-CSS": { availableFonts: ["TeX"], scale: 130 }
    });
}

function switchPanel(name) {
  $('.panel').css( "display", "none");
  $('#'+name).css( "display", "block");
}

function templateApply(wd) {
  var templateNow = config.template[domain];
  if (templateNow===undefined)
    templateNow = config.template['default'];
  return templateNow.split('<%=wd%>').join(wd); // 不能用 replace(reg, str), 因為 str 中可能有參數 ＄...$ 符號，所以改用 split + join
}

function login() {
  switchPanel('panelLogin');
}

function logout() {
  Server.logout();
}

function edit() {
  switchPanel('panelEdit');
}

function upload() {
  if (!isLogin()) return;
  switchPanel('panelUpload');
  $("#imageUpload").fileinput({
    uploadUrl: "/upload/"+domain,
    maxFileCount: 10,
    uploadAsync: false,
    uploadExtraData: {
        domain: domain,
        file: file
    }
  });
}

function absolute(base, relative) {
    var stack = base.split("/"),
        parts = relative.split("/");
    stack.pop(); // remove current file name (or empty string)
                 // (omit if "base" is the current folder without trailing slash)
    for (var i=0; i<parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();
        else
            stack.push(parts[i]);
    }
    return stack.join("/");
}

function httpRef() {
  return window.location.href.replace('https:', 'http:');
}

function facebookShare() {
  window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(absolute(httpRef(), 'db/'+domain+'/'+file+'.html'))+'&t='+document.title, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
}

function staticShare() {
  window.open(absolute(httpRef(), '../../db/'+domain+'/'+file+'.html'), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600')
}

function show() {
  var wd = $('#wdBox').val().trim();
  wd  = templateApply(wd);
  staticUrl = absolute(httpRef(), '../../db/'+domain+'/'+file+'.html');
  var html = wdlib.wd2html(wd, domain, {isHash:isHash});
         //  +'<div class="fb-comments" data-href="'+staticUrl+'" data-numposts="5" data-colorscheme="light"></div>';
  $('#htmlBox').html(html);
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
  switchPanel('panelShow');
  if (typeof(MathJax) !== 'undefined') {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub, "htmlBox"]);
	}
  showTitle();
}

function showTitleHead(domain) {
  var titleHead = config.title['default'];
  if (config.title[domain] !== undefined)
    titleHead = config.title[domain];
// Unicode Symbol page : http://jrgraphix.net/r/Unicode/2600-26FF
  titleHead = ' [[※]](main:home) '+titleHead; // &#x264B; &#x26EA; <- house &#9967;
  var titleHtml = wdlib.wd2html(titleHead, domain, {isHash:isHash});
  $('#titleHead').html(titleHtml);
}

function showTitle() {
  if ($('h1').length > 0)
    $('title').html($('#titleHead').text()+' -- '+$('h1')[0].innerText);
  else if ($('h2').length>0)
    $('title').html($('#titleHead').text()+' -- '+$('h2')[0].innerText);
}

function showSide(domain) {
  var side = config.side['default'];
  if (config.side[domain] !== undefined)
    side = config.side[domain];
  var items = side.split(";");
  var sideHtml = '';
  for (var i in items) {
    var parts = items[i].split("#");
    if (parts.length > 2 && parts[2]==="active")
      sideHtml += '<li class="active"><a href="#'+domain+':'+parts[1]+'">'+parts[0]+'</a></li>\n';    
    else
      sideHtml += '<li><a href="#'+domain+':'+parts[1]+'">'+parts[0]+'</a></li>\n';    
  }
  if (side.length === 0) {
    $('#side').html('');
  } else {
    $('#side').html(sideHtml);
  }
    
}

function loadFile(pDomain, pFile) {
  domain = pDomain, file=pFile;
  showTitleHead(domain);
  showSide(domain);
  $('#staticUrl').val(absolute(httpRef(), 'db/'+domain+'/'+file+'.html'));
  if (isHash === true) {
    Server.load(domain, file)
    .done(function(wd) {
      $('#wdBox').val(wd);
      show();
    })
    .fail(function() {
      $('#wdBox').val(wdNewFile);
      show();
    });
  } else {
    show();
  }    
}

function save() {
  if (!isLogin()) return;
  var wd = $('#wdBox').val();
  Server.save(domain, file, wd);
}

/*
// 以下這種作法是為了加快速度，避免一開始載入 MathJax 花太久時間 ...
// 刻意把 '</'+'script>' 分開，避免瀏覽器認為是真的 script 區塊
$( document ).ready(function() {
    $('body').append('<'+'script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></'+'script>');
});
*/  
