var e2c={dog:"狗", cat:"貓"};

function understand(s) {
  var c1 = e2c[s[1]], c4=e2c[s[4]];
  if (s[2] === "eat") {
    console.log("%s 被吃了", c4);
    console.log("%s 吃了 %s", c1, c4);
    return;
  } else if (s[2] === "chase") {
    console.log("%s 被追了", c4);
    console.log("%s 追了 %s", c1, c4);
    return;
  } 
}

understand(process.argv.slice(2));