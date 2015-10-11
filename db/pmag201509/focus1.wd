## Nand2Tetris 第 6 週 -- 自製組譯器

本文程式修改自下列 github 網址，使用時請注意遵守開源授權。

* <https://github.com/havivha/Nand2Tetris/tree/master/6>

關於 nand2tetris 第 6 週的內容與解說，請參考下列文章。

* [少年科技人雜誌 / 2015年6月號 / Nand2Tetris 第 6 週 -- 組譯器](http://ccc.nqu.edu.tw/db/ymag201506/focus8.html)

在本文中，我們主要補充的是實作的方法。我們採用 JavaScript 撰寫，並用 node.js 環境進行測試。

由於 HackCPU 的獨特設計方式，讓組譯器牽涉到比較多的表格，以下是這些表格的內容。

```javascript
var dtable = {
  ""   :0b000,
  "M"  :0b001,
  "D"  :0b010,
  "MD" :0b011,
  "A"  :0b100,
  "AM" :0b101,
  "AD" :0b110,
  "AMD":0b111
}

var jtable = {
  ""   :0b000,
  "JGT":0b001,
  "JEQ":0b010,
  "JGE":0b011,
  "JLT":0b100,
  "JNE":0b101,
  "JLE":0b110,
  "JMP":0b111
}

var ctable = {
  "0"   :0b0101010,
  "1"   :0b0111111,
  "-1"  :0b0111010,
  "D"   :0b0001100,
  "A"   :0b0110000, 
  "M"   :0b1110000,
  "!D"  :0b0001101,
  "!A"  :0b0110001, 
  "!M"  :0b1110001,
  "-D"  :0b0001111,
  "-A"  :0b0110011,
  "-M"  :0b1110011,
  "D+1" :0b0011111,
  "A+1" :0b0110111,
  "M+1" :0b1110111,
  "D-1" :0b0001110,
  "A-1" :0b0110010,
  "M-1" :0b1110010,
  "D+A" :0b0000010,
  "D+M" :0b1000010,
  "D-A" :0b0010011,
  "D-M" :0b1010011,
  "A-D" :0b0000111,
  "M-D" :0b1000111,
  "D&A" :0b0000000,
  "D&M" :0b1000000,
  "D|A" :0b0010101,
  "D|M" :0b1010101
}

var symTable = {
  "R0"  :0,
  "R1"  :1,
  "R2"  :2,
  "R3"  :3,
  "R4"  :4,
  "R5"  :5,
  "R6"  :6,
  "R7"  :7,
  "R8"  :8,
  "R9"  :9,
  "R10" :10,
  "R11" :11,
  "R12" :12,
  "R13" :13,
  "R14" :14,
  "R15" :15,
  "SP"  :0,
  "LCL" :1,
  "ARG" :2,
  "THIS":3, 
  "THAT":4,
  "KBD" :24576,
  "SCREEN":16384
};
```

然後和傳統的組譯器一樣，我們可以採用兩階段的組譯方式，第一階段紀錄每個符號的位址，第二階段則進行編碼的動作。

```javascript
function pass1(lines) {
  // 對於每一行程式碼
  //   計算該行的位址
  //   如果有符號，紀錄符號的位址
}

function pass2(lines, objFile) {
  // 對於每一行程式碼
  //   將指令轉為機器碼 (查表，編碼，輸出)
}

// 轉換指令為程式碼的主要程式如下。
function toCode(p) {
  var address; 
  if (p.type === "A") {
    if (p.arg.match(/^\d+$/)) {
      address = parseInt(p.arg);
    } else {
      address = symTable[p.arg]; 
      if (typeof address === 'undefined') {
        address = symTop;
        addSymbol(p.arg, address);        
      }
    }
    return address; 
  } else { // if (p.type === "C")
    var d = dtable[p.d];
    var cx = ctable[p.c];
    var j = jtable[p.j];
    return 0b111<<13|cx<<6|d<<3|j;
  }
}
```

只要搞清楚指令格式，並且把表格寫出來， HackCPU 的組譯器算是相當容易撰寫的一個程式。

