function cline2words(dic, line) {
  var words = [], word, toWord;
  for (var i=0; i<line.length; ) {
    for (var len=4; len>0; len--) {
      word = line.substr(i, len);
      toWord = dic[word];
      if (typeof toWord !== "undefined") {
        break;
      }
    }
    words.push(word);
    i=i+Math.max(1,len);
  }
  return words;
}

function eline2words(dic, line, spliter) {
  return line.split(spliter);
}

function wordsMt(dic, words) {
  var toWords = [];
  for (var i in words) {
    var value = dic[words[i]];
//    if (typeof hits === 'undefined') hits = [];
    toWords.push(value);
  }
  return toWords;
}

// dic: 字典, source:原文, mode:eline,cline,spliter
function translate(dic, source, mode) {
  var words, spliter;
  if (typeof source === 'string') {
    if (mode === "cline") {
      words = cline2words(dic, source);
    } else {
      spliter = (mode!=="eline"?mode:/\s+/g);
      words = eline2words(dic, source, spliter);
    }
  } else {
    words = source;
  }
  return { words:words, mtWords:wordsMt(dic, words) };
}

var mt = {};

mt.translate = translate;

module.exports = mt;

/*
function mt(str) {
  var re = /([\w']+)/gi;  
  var toStr = "";
  var si = 0;
  while (m = re.exec(str)) {
    var eword = m[1], elower=eword.toLowerCase();
    var cword = dict[eword.toLowerCase()];
    toStr += str.substring(si, re.lastIndex-eword.length);
    if (cword === undefined || knowWords[elower] !== undefined)
      cword = "";
    toStr += '<ruby class="'+normalize(eword)+'"><rb>'+eword+'</rb><rt>'+cword+'</rt></ruby>';
    si = re.lastIndex;
  }
  return toStr;
}
*/
