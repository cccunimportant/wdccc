# 小時鐘

本範例簡化自： <http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock>

範例： [clock.html](http://ccc.nqu.edu.tw/db/jsb/code/clock.html)

```
<!DOCTYPE html>
<html>
<head>
<script>
function showTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    document.getElementById('time').innerHTML = h+":"+m+":"+s;
    setTimeout(function(){showTime()},500);
}
</script>
</head>

<body onload="showTime()">

<div id="time"></div>

</body>
</html>

```