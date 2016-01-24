var fs = require("fs");
var util = require("util");
var lib  = require("./lib");
var kb = require("./kb");
var kb8= require("./kb8");

// 注意：. 在 [] 中代表點符號而已。
// 注意：According to MDN, [^] also works to match any character, including newlines
var skipMap = { 
text:[],
  html:[ /^`.*?`/i, /^<!--[\w\W]*?-->/i, /^<script[\w\W]*?<\/script>/i, 
         /^<style[\w\W]*?<\/style>/i, /^<.+?>/i ],
  md:[ /^`.*?`/i, /^\n'''\w+[\w\W]*?\n'''/i, /^`.*?`/i]
}

var mt8 = { kb8:kb8 };

var formatMap = { 
  ruby_st:"<ruby><rb>%s<sub>%p</sub></rb><rt>%t</rt></ruby>", 
  ruby_ts:"<ruby><rb>%t</rb><rt>%s<sub>%p</sub></rt></ruby>",
  st:"[%s:%p=%t]",
  s:"%s",
  t:"%t"
};

function format(o, mode) {
  var s = lib.defaultTo(o.s,'　');
  var t = lib.defaultTo(o.t,'　');
  var p = lib.defaultTo(o.p,'　');
  var str = formatMap[mode];
  return str.replace(/%s/g, s).replace(/%t/g, t).replace(/%p/g, p);
}

var suffixList = [
  "=", "d=", "s=", "es=", "ed=", "ly=", "al=", 
  "er=e=更%c", "er==更%c", "'s==%c的", "ies=y", "ing=", "ing=e", "est=e=最%c", "able==可%c" ];

mt8.load=function(kb8json) {
  kb8.loadJson(kb8json);
  var tc2sc = kb8.tables['c2sc'];
  var c2e   = kb8.tables['c2e'];
  for (var tc in c2e) {
    var sc = mt8.tc2sc(tc);
    var e = c2e[tc];
    kb.add(c2e, sc, e);
  }
}

mt8.e2c=function(e) {
  e = e.toLowerCase();
  for (var i=0; i<suffixList.length; i++) {
    var pair = suffixList[i].split('=');
    if (e.endsWith(pair[0])) {
      var e0=e.substr(0, e.length-pair[0].length)+pair[1];
      var c = kb8.getOne('e2c', e0);
      var p = kb8.getOne('e2p', e0);
//      console.log("e0=%s c=%s p=%s", e0, c, p);
      if (lib.defined(c)) {
        var rule = lib.defaultTo(pair[2], '%c');
        var crule = lib.replace(rule, '%c', c);
        return {c:crule, p:p};
      }
    }
  }
  return {c:'_', p:'_'};
}

mt8.addCEP=function(tc, e, p) {
  var c2e = kb8.tables['c2e'];
  var e2c = kb8.tables['e2c'];
  var sc = mt8.tc2sc(tc); 
  e = e.toLowerCase();  
  console.log("addCEP:", tc, e, p);
  kb.add(c2e, tc, e, "first");
  kb.add(c2e, sc, e, "first");
  kb.add(e2c, e, tc, "first");
  if (lib.defined(p))
    kb.add(kb8.tables.e2p, e, p, "first");
}
  
mt8.tc2sc = function(str) {
  var dic = kb8.tables['c2sc'];
  var scStr = '';
  for (var i=0; i<str.length; i++) {
    var c = str[i];
    var sc = dic[c];
    if (lib.defined(sc)) {
      scStr += sc;
    } else {
      scStr += c;
    }
  }
  return scStr;
}
  
mt8.lineMt=function(line, formatMode) {
  var toText = '';
  for (var i=0; i<line.length; ) {
    var tail = line.substr(i);
    if (m=tail.match(/^([a-z_']+)(:([a-z]))?=([\u4E00-\u9FA5]*)/i)) { // [英文:p=中文]
      var e = m[1], p=m[3], c=m[4];
      var cp = mt8.e2c(e);
      mt8.addCEP(c, e, p);
//      kb.add(kb8.tables.e2c, e, c);
//      kb.add(kb8.tables.c2e, c, e);
//      if (lib.defined(p))
//        kb.add(kb8.tables.e2p, e, p);
      p=p?p:cp.p;
      toText += format({s:e,t:c,p:p}, formatMode);
      i+= m[0].length;
    } else if (m=tail.match(/^([\u4E00-\u9FA5]+)=([a-z_']*)(:([a-z_]))?/i)) { // [中文=英文:p]
      var c = m[1], e=m[2], p=m[4];
      var cp = mt8.e2c(e);
      mt8.addCEP(c, e, p);
//      kb.add(kb8.tables.c2e, c, e);
//      kb.add(kb8.tables.e2c, e, c);
//      if (lib.defined(p))
//        kb.add(kb8.tables.e2p, e, p);
      p=p?p:cp.p;
      toText += format({s:e,t:c,p:p}, formatMode);
      i+= m[0].length;
    } else if (m=tail.match(/^[0-9]+(\.[0-9]*)/i)) { // 數字
      var e=m[0], c=m[0], p='d';
      toText += format({s:e,t:c,p:p}, formatMode);
      i+=e.length;
    } else if (m=tail.match(/^[a-z'_]+/i)) { // 英文字串
      var e = m[0];
      var cp = mt8.e2c(e);
      toText += format({s:e,t:cp.c,p:cp.p}, formatMode);
      i+=e.length;
    } else if (m=tail.match(/^[\u4E00-\u9FA5]+/i)) { // 中文字串
      var ci, len, c, hits;
      var cstr = m[0];
      var estr = '';
      for (ci = 0; ci<cstr.length; ) {
        for (len=4; len>0; len--) {
          if (ci+len > cstr.length) continue;
          c = cstr.substr(ci, len);
          var e = kb8.getOne('c2e', c);
          var p = kb8.getOne('e2p', e);
          if (lib.defined(e)) break;
        }
        if (ci>0 && cstr.substr(ci-1,2).match(/^[一-九十][種台個輛支枝]/)) {
          e=''; p='';
        }
        var eword = format({s:e,t:c, p:p}, formatMode);
        if (eword !== '')
          estr += eword+' ';
        ci=ci+Math.max(1,len);
      }
      toText += estr.trim();
      i+=cstr.length;
    } else {
      toText += tail[0];
      i++;
    }    
  }
  return toText;
}

mt8.translate=function translate(text, formatMode, docType) {
  // 由於 regexp 的 multiline 模式的 ^ 會比對換行字元，因此我們先取代後再換回來。
  if (text.indexOf('\u00FF')>=0) throw Error('text should not contain \\u00ff');
  text = text.replace(/\n/gi, '\u00FF');
  formatMode = lib.defaultTo(formatMode, 'st');
  docType= lib.defaultTo(docType, 'text');
  var m, skipExpList = skipMap[docType];
  var toText = "";
  for (var i=0; i<text.length;) {
    var tail = text.substr(i);
    var skipStr = null;
    for (var si in skipExpList) {
      m = tail.match(skipExpList[si]);
      if (m) {
        skipStr = m[0];
        break;
      }
    }
    if (skipStr !== null) {
      toText += skipStr;
      i+= skipStr.length;
    } else if (m=tail.match(/^[a-z'0-9_:\s\u4E00-\u9FA5=]+/i)) {
      var line = m[0];
      var lmt = mt8.lineMt(line, formatMode);
      toText += lmt;
      i+=line.length;
    } else {
      toText += tail[0];
      i++;
    }
  } 
  toText = toText.replace(/\u00FF/gi, '\n');
  return toText;
}

module.exports = mt8;

/*

public class MT5 extends TreeMap {
    public static void main(String[] args) throws Exception {
        String[] files = {"MT_E.htm", "Patent1_E.htm", "Patent2_E.htm", "Patent3_E.htm", "Patent4_E.htm", "Yahoo_E.htm", "Tom_E.txt"};
          String text, html, tHtml;
          for (int i=0; i<files.length; i++) {
              System.out.println("Translate file :"+files[i]);
             html  = STR.file2text("MT\\Test\\"+files[i]);            // translate html file
            tHtml = MT5.translate(html, table, "英", "中");
            STR.text2file(tHtml, "MT\\Test\\"+STR.replace(files[i], "_E", "_C"));
          }
    }
 
    static final String[] patterns={ / * 0. comment* / "<!--.*?-->", / * 1.script* / "<script.+?</script>", / *2.style* / "<style.+?</style>", / *3.mark-up* / "<.+?>", / *4.url* /"http://.{10,30}/?", / *5.-abc-, .abc-* / "[\\.\\/-]\\w+[\\.\\/-]", / *6.phrase=three words* /"\\p{Alpha}+[\\s-]\\p{Alpha}+[\\s-]\\p{Alpha}+", / *7.phrase=two words* / "\\p{Alpha}+[\\s-]\\p{Alpha}+", / *8.word* /"\\p{Alpha}+", / *9.others* /"." };
    static final int PHRASE = 6, WORD=8;
    static final String normalizeMacros=" \n= |-\n=|n't = not |'re = are |'m = am |'ve = have |'d =would |can't =can not |Intern'l =International |U.S.=United States |U.K.=United Kingdom |Appl. No.=申請號 |Mar.=三月|May.=五月 |Dec.=十月 |Dr.=博士|FIG.=圖示 |FIGS.=圖示 ";
 
    public static String translate(String pText, Table pTable, String pFromField, String pToField) throws Exception {
        pText = STR.expand(pText, normalizeMacros); // normalize text
        StringBuffer rzText = new StringBuffer();
        for (int i=0; i<pText.length(); ) {
            String token=null, toToken=null;
            for (int pi=0; pi<patterns.length; pi++) {
                token = STR.matchAt(pText, i, patterns[pi]);
                if (token == null) continue;
                if (pi<PHRASE || pi>WORD) break;
                // the following code for PHRASE and WORD only.
                token = STR.replace(token, "-", " ");
                toToken = translateWord(token, pTable, pFromField, pToField);
                if (toToken != null) break;
                if (pi==WORD) break;
            }
            if (toToken == null || toToken.length()==0) 
                toToken = token;
            rzText.append(toToken);
            i+=token.length();
        }
        return rzText.toString();
    }
 
    static final String[] suffixMacros = {";= ", "s;= ", "es;= ", "ies;=y ", "ing;= ", "ing;=e ", "er;=e ", "est;=e;", "ed;= ", "d;= ", "ly;= ", "ies;=y ", "al;= ", "able;= "};
 
    public static String translateWord(String pWord, Table pTable, String pFromField, String pToField) throws Exception {
        int toFieldIdx = pTable.field2idx(pToField);
        if (pWord == null) return null;
        String extWord = pWord.toLowerCase()+";";
        for (int i=0; i<suffixMacros.length; i++) {
            String suffix = STR.head(suffixMacros[i], "=");
            String toSuffix= STR.tail(suffixMacros[i], "=");
            String word = STR.replace(extWord, suffix, toSuffix).trim();
            Record toRecord = pTable.find(pFromField, word);
            if (toRecord == null)
                continue;
            else
                  return toRecord.get(toFieldIdx).trim();
        }
        return null;
    }
}
*/

/*    
    if (m=tail.match(/^[a-zA-Z0-9]+/i)) { // 英文字串
      var e = m[0];
      var el= e.toLowerCase();
//      var c = kb8.getOne('e2c', el);
//      var p = kb8.getOne('e2p', el);
      var cp = mt8.e2c(el);
      toText += format({s:e,t:cp.c,p:cp.p}, formatMode);
      i+=e.length;
    } else if (m=tail.match(/^[\u4E00-\u9FA5]+/i)) { // 漢字字串
      var ci, len, c, hits;
      var cstr = m[0];
      var estr = '';
      for (ci = 0; ci<cstr.length; ) {
        for (len=4; len>0; len--) {
          if (ci+len > cstr.length) continue;
          c = cstr.substr(ci, len);
          var e = kb8.getOne('c2e', c);
          var p = kb8.getOne('e2p', e);
          if (lib.defined(e)) break;
        }
        var eword = format({s:e,t:c, p:p}, formatMode);
        if (eword !== '')
          estr += eword+' ';
        ci=ci+Math.max(1,len);
      }
      toText += estr.trim();
      i+=cstr.length;
*/      
