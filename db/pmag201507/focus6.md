## Nand2Tetris 第四週 -- 學習機器語言

關於第四週的學習機器語言部份，是要我們設計 HackComputer 的兩個組合語言程式，一個是控制鍵盤與畫面的 Fill.asm ，另一個是計算乘法的 Mult.asm。

為了避免公佈答案，在此我只寫下我在這兩個程式所採用的算法虛擬碼，以下是 Fill.asm 的高階虛擬碼。

```
forever
  arr = SCREEN
  for (i=0; i<8192; i++) {
    if (*KBD != 0)
      arr[i] = -1
    else
      arr[i] = 0
  }
  goto forever;
```

以下是較接近組合語言的低階虛擬碼，此虛擬和上面的並不完全一致，因為我有進一步簡化過。

```
  arr = SCREEN
  n=8192
  i=0
FOREVER:
LOOP: 
  if (i==n) goto ENDLOOP
  if (*KBD != 0)
    arr[i] = 0;  // 0x0000
  else
    arr[i] = -1; // 0xFFFF
  i++;
ENDLOOP:
  goto FOREVER	
```

組合語言 : Mult.asm

```
// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.
  a = 0
LOOP:
  if (a <= 0) goto EXIT
    a=a-1;
  R2 = R2 + R1;
  goto LOOP
```

在寫好組合語言程式 Fill.asm 與 Mult.asm 之後，您可以使用 nand2tetris 所提供的 CPUEmulator 來執行並驗證您寫出來的組合語言程式。

### 結語

組合語言單元的原理請參考下列文件：

* [少年科技人雜誌 / 2015年6月號 / Nand2Tetris 第 4 週 -- 機器語言](http://ccc.nqu.edu.tw/db/ymag201506/focus6.html)

