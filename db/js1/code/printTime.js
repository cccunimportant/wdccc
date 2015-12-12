function printTime1() {
  console.log("printTime1:"+new Date());
}

setTimeout(printTime1, 500);

function printTime() {
  console.log("printTime:"+new Date());
  setTimeout(printTime, 500);
}

setTimeout(printTime, 500);

