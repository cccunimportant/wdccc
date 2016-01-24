var c = console;

var mt = {
  dictMap : {
      tw: { "Login":"登入", "Logout":"登出", "Sign up":"申請帳號", "Help":"說明", "Language":"語言",
    "Author":"作者", "License":"授權", "Email":"電子郵件", "Password":"密碼", "Remember me":"記住我", "User":"使用者", "account":"帳號"
    },
    us: {}
  },
  lang:'tw', 
}

mt.dict=mt.dictMap['tw'];

mt.mt = function mt(e) {
  var v = mt.dict[e];
  return (v===undefined)?e:v;
}

mt.switchLang = function switchLang(pLang) {
  mt.lang = pLang;
  mt.dict = mt.dictMap[mt.lang];
  window.localStorage["Mt_lang"]=pLang;
  $( "[data-mt]" ).each(function() {
    var e = $(this).data("mt");
    if ($(this).attr("placeholder") === undefined) {
      $(this).text(mt.mt(e));
    } else {
      $(this).attr("placeholder", mt.mt(e));
    }
  });
}

var account = {};

account.init = function init() {
  c.log(window.localStorage);
  mt.lang = window.localStorage['lang'];
  if (mt.lang === undefined) mt.lang='tw';
  mt.switchLang(mt.lang);
}

account.login = function login(user, password) {
  window.localStorage["user"]=user;
  location.reload();
}

account.logout = function logout() {
  delete window.localStorage["user"];
  location.reload();
}

var db = {};

db.forget = function DB_forget(name) {
  window.localStorage.removeItem(name);
}

db.load = function DB_load(name) {
   if (window.localStorage[name] !== undefined) 
     return JSON.parse(window.localStorage[name]);
   else
     return undefined;
}

db.save = function DB_save(name, obj) {
  window.localStorage[name] = JSON.stringify(obj);
}

var spa = {
  db:db,
  mt:mt,
  account:account
};

spa.switchPanel = function switchPanel(name) {
  $(".panel" ).css( "display", "none" );
  $("#panel"+name).css("display", "block");
  $(".tab" ).removeClass("active");
  $("#tab"+name).addClass("active");
}

if (typeof module !== 'undefined')
  module.exports = spa;
