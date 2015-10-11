var log = console.log;

function sum(n) {
    var s=0;
    for (var i=1; i<=n; i++)
        s += i;
    return s;
}

function s(n) {
    if (n==1) return 1;
    var sn = s(n-1)+n;
    log("s(%d)=%d", n, sn);
    return sn;
}

function f(n) {
    if (n==0) return 1;
    if (n==1) return 1;
    
    return f(n-1)+f(n-2);
}

log("f(5)=%d", f(5));
log("sum(10)=%d", sum(10));
log("s(10)=%d", s(10));

