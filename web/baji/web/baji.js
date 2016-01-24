(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":3,"inherits":2}],6:[function(require,module,exports){
lib = require("../lib/lib");
kb = require("../lib/kb");
// kb8 = require("../lib/kb8");
mt8 = require("../lib/mt8");
kb8 = mt8.kb8;
// spa = require("../lib/spa");


},{"../lib/kb":7,"../lib/lib":9,"../lib/mt8":10}],7:[function(require,module,exports){
var fs = require("fs");
var lib = require("./lib");

var kb = {};

kb.getOne = function(dic, key) {
  var hits = kb.getHits(dic, key);
  if (lib.defined(hits))
    return hits[0];
}

kb.getHits = function(dic, key) {
  var hits = dic[key];
  if (hits instanceof Array)
    return hits;
}

kb.add = function(dic, key, value, where) {
  var hits = kb.getHits(dic, key);
  if (!lib.defined(hits)) 
    dic[key] = [ value ];
  else if (hits instanceof Array){
    if (hits.indexOf(value)<0) {
      if (lib.defined(where) && where === 'first')
        hits.unshift(value);
      else
        hits.push(value);
    }
  } else if (typeof hits !== 'function'){ // 排除 o.constructor=function() {} 這些預設函數
    console.log('kb.add key=%s hits.type=%s', key, typeof hits);
    throw Error('kb.add'); 
  }
}

// 範例 text: a1,a2...=b1,b2,...;c=d;... spliter:; k:0 
kb.text2dic = function(text, options) {
  var opt = lib.defaultTo(options, {});
  var k   = lib.defaultTo(opt.k, 0);
  var kfilter = lib.defaultTo(opt.kfilter, null);
  var vfilter = lib.defaultTo(opt.vfilter, null);
  var spliter = lib.defaultTo(opt.spliter, '\n');
  var keyLower = lib.defaultTo(opt.keylower, true);
  var replace = lib.defaultTo(opt.replace, false);
  var dic = {};
  var lines = text.split(spliter);
  for (var i=0; i<lines.length; i++) {
    var line = lines[i].trim();
    if (line.match(/=.*?=/)) {  // mobyposi.i 有些錯， 像 Set=bal=N, 濾掉
      console.log("Error:line %d, ignore %s", i+1, line);
      continue;
    }
    if (line === '') continue;
    var pair = line.split("=");
    var head = pair[0];
    var tail = lib.defaultTo(pair[1], '');
    var keys = head.split(",");
    var values = tail.split(",");
    if (k===1) {
      var t = keys;
      keys = values;
      values = t;
    }
    for (var ki=0; ki< keys.length; ki++) {
      if (kfilter !== null && kfilter.indexOf(ki)<0) continue;
      var key   = keys[ki].trim();
      if (keyLower) key=key.toLowerCase();
      for (var vi=0; vi<values.length; vi++) { // 注意：不能改成 for (in)，因為取出的是字串，不是整數
        var value = values[vi].trim();
        if ((vfilter !== null) && (vfilter.indexOf(vi)<0)) continue;
        if (key === value) continue;
        if (replace && lib.defined(kb.getOne(dic, key))) {
          dic[key] = [ value ];
        } else
          kb.add(dic, key, value);
      }
    }
  }
  return dic;
}

kb.loadDic = function(fileName, options) {
  var fileText = fs.readFileSync(fileName, 'UTF-8');
  return kb.text2dic(fileText, options);
}

// 尚未測試
/*
kb.saveDic = function(dic, options) {
  var text = '';
  for (var key in dic) {
    var hits = dic[key];
    if (hits instanceof Array) {
      text += hits.join(',')+'\n';
    }
  }
  return text;
}
*/

module.exports = kb;
},{"./lib":9,"fs":1}],8:[function(require,module,exports){
var fs = require("fs");
var util = require("util");
var kb = require("./kb");
var lib = require("./lib");

var kb8 = {};

kb8.loadJson=function(tables) {
  this.tables = tables;
}

kb8.loadKb=function() {
  var e2cpText=fs.readFileSync("../kb/e2cp.dic", 'UTF-8');
  var tables = {};
  tables.e2c = kb.text2dic(e2cpText, {vfilter:[0]});
  tables.e2p = kb.text2dic(e2cpText, {vfilter:[2]});
/*  
  var cc2eText=fs.readFileSync("../kb/c2e.dic", 'UTF-8');
  var tc2e = kb.text2dic(cc2eText, {kfilter:[0]});
  var sc2e = kb.text2dic(cc2eText, {kfilter:[1]});  
  tables.c2e = lib.merge(tc2e, sc2e);
*/  
  tables.c2e = kb.loadDic("../kb/c2e.dic");
  tables.c2sound = kb.loadDic("../kb/c2sound.dic");
  tables.c2sc = kb.loadDic("../kb/c2sc.dic");
  this.tables = tables;
}

kb8.saveKb=function() {
  fs.writeFileSync("../kb/kb8.json", "var kb8json="+JSON.stringify(this.tables, null, 0), "UTF-8");
}

kb8.getHits=function(tableName, key) {
  var table = this.tables[tableName];
  if (!lib.defined(table)) throw Error('getHits:tableName('+table+') not found');
  var o = table[key];
  return o?o:[];
}

kb8.getOne=function(tableName, key) {
  return this.getHits(tableName, key)[0];
}

module.exports = kb8;

},{"./kb":7,"./lib":9,"fs":1,"util":5}],9:[function(require,module,exports){
var lib = {};

lib.replace = function(str, a, b) {
  return str.split(a).join(b);
}

lib.defined = function(variable) {
  return typeof variable !== 'undefined';
}

lib.defaultTo = function(variable, defaultValue) {
  return (variable?variable:defaultValue);
}

lib.clone=function(o) {
  if (typeof o === 'undefined') return {};
  return JSON.parse(JSON.stringify(o));  
}

lib.merge=function(o1, o2) {
  var o = lib.clone(o1);
  for (var key in o2) {
    if (typeof o1[key] === 'undefined')
      o[key] = o2[key];
  }
  return o;
}

lib.list=function(o, keys) {
  var a = [];
  for (var i in keys) {
    a.push(o[keys[i]]);
  }
  return a;
}

module.exports = lib;

/*
function hitJoin(dictHit, dictObj) {
  var dictJoin = {};
  for (var x in dictHit) {
    var list = dictHit[x];
    for (var i in list) {
      var y = list[i];
      if (typeof dictJoin[y] === "undefined") {
        dictJoin[y] = [];
      }
      dictJoin[y].push(dictObj[x]);
    }
  }
  return dictJoin;
}


function hitReverse(dictHit) {
  var dictRev = {};
  for (var x in dictHit) {
    var list = dictHit[x];
    for (var i in list) {
      var y = list[i];
      if (typeof dictRev[y] === "undefined") {
        dictRev[y] = [];
      }
      dictRev[y].push(x);
    }
  }
  return dictRev;
}

*/
},{}],10:[function(require,module,exports){
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

},{"./kb":7,"./kb8":8,"./lib":9,"fs":1,"util":5}]},{},[6]);
