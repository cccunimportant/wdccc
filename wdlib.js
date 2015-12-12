var wdlib = (function() {

if (typeof module !== 'undefined') {
  Showdown = require('showdown');
}

var converter = new Showdown.converter({ extensions: ['mathjax', 'table'] });

function wd2md(wd, domain) {
  var md = wd
	   .replace(/(\s)@\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1[$2]($3)') // 內部檔案 
	   .replace(/(\s)@\[\[([^\]]*?)\]\]/gi, '$1[$2]($2)') // 內部檔案
	   .replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1![$2]($3)')
     .replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi,  '$1[$2](../$3/$4.html)')
     .replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1[$2]($3.html)')
     .replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1[$2]($2.html)');
  return md;
}

function md2html(md) {
  return converter.makeHtml(md);
}

function wd2html(wd, domain, options) {
  wd  = '\n'+wd+' ';
  wd  = wd.replace(/(\s)@\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1<a href="db/'+domain+'/$3" class="innerLink">$2</a>'); // 內部檔案 [[text]](pathToFile)
  wd  = wd.replace(/(\s)@\[\[([^\]]*?)\]\]/gi, '$1<a href="db/'+domain+'/$2" class="innerLink">$2</a>'); // 內部檔案 [[pathToFile]]
  wd  = wd.replace(/(\s)\!\[\[([^\]]*?)\]\]\((.*?)\)/gi, '$1<div class="figure"><img src="db/'+domain+'/$3"/><p class="caption">$2</p></div>'); // 內部圖片 ![[text]](file)
  wd  = wd.replace(/(\s)\[\[([^\]]+?)\]\]\(([^:\)]+):([^:\)]+)\)/gi, '$1<a href="#$3:$4" class="innerLink">$2</a>'); // 內部連結 [[text]](domain:file)
  wd  = wd.replace(/(\s)\[\[([^\]]+?)\]\]\((.*?)\)/gi, '$1<a href="#'+domain+':$3" class="innerLink">$2</a>'); // 內部連結 [[text]](file)
  wd  = wd.replace(/(\s)\[\[([^\]:]+):([^\]:]+)\]\]/gi, '$1<a href="#$2:$3" class="innerLink">$2:$3</a>'); // 內部連結 [[domain:file]]
  wd  = wd.replace(/(\s)\[\[([^\]:]+?)\]\]/gi, '$1<a href="#'+domain+':$2" class="innerLink">$2</a>'); // 內部連結 [[file]]
//  wd  = wd.replace(/(\s)\$([^$\n]+?)\$/gi, '$1\n<script type="math/tex">$2</'+'script>\n');// 數學式 $$[latex]$$,  刻意把 '</'+'script>' 分開，避免瀏覽器認為是真的 script 區塊
  if (options.isHash===false) {
    wd = wd.replace(/href="#(\w+):(\w+)"/gi, 'href="db\/$1\/$2\.html""');
  }
  return md2html(wd);
}

function wd2staticHtml(wd, domain, pathLink, staticTemplate) {
  var title='', titleMatch = wd.match(/([^#\n]{1,100})/);
  if (typeof pathLink === 'undefined') pathLink = '';
  var path = pathLink.replace(/\(.+?\)/g, '').replace(/[\[\]]/g, '');
  if (titleMatch !== null)
    title = path + "/"+ titleMatch[1];
  else
    title = path;
  var titleHtml = wd2html(title, domain, {isHash:false});
  var wdHtml = wd2html(wd, domain, {isHash:false});
  var html = staticTemplate.replace("{%=wdHtml%}", wdHtml).replace("{%=pathLink%}", pathLink).replace("{%=title%}", title);
  return html;
}

  return {
    wd2md:wd2md,
		md2html:md2html,
		wd2html:wd2html,
    wd2staticHtml:wd2staticHtml
  }
})();

if (typeof module !== 'undefined') 
	module.exports = wdlib;
