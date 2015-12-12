# jslib 模組

檔案： jslib.js

```javascript
var jslib = (function() {
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
	
  function replace(str, source, target) {
    return str.split(source).join(target);
  }

  return {
		endsWith:endsWith,
		replace: replace,
  }
})();

if (typeof module !== 'undefined') 
	module.exports = jslib;
```

上述程式相當於下列作法，只是更簡短一點而已。

```javascript
var f = function() {
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
	
  function replace(str, source, target) {
    return str.split(source).join(target);
  }

  return {
		endsWith:endsWith,
		replace: replace,
  }
}

jslib = f();

if (typeof module !== 'undefined') 
	module.exports = jslib;
```

採用這種將函數呼叫後展開的方法，目的是為了避免讓區域變處污染到全域變數。

