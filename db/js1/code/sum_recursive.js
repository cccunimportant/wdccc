var log = console.log;

function s(n) {
    if (n==1) return 1;
    var sn = s(n-1)+n;
    log("s(%d)=%d", n, sn);
    return sn;
}

log("s(10)=%d", s(10));

