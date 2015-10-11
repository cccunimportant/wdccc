## Nand2Tetris 第一週 -- 自製邏輯元件

我們將第一週的習題主要部份放在 gate.v , gate16.v 與 mux.v 這些 verilog 程式檔中，然後再分別寫測試檔去測試這些程式。

我們使用的測試工具是 icarus verilog 。

### 基本邏輯閘

程式模組： gate.v 

```verilog
module Nand(input a, b, output out);
  nand g1(out, a, b);
endmodule

module Not(input in, output out);
  Nand g1(in, in, out);
endmodule

module Or(input a, b, output out);
  Not g1(a, nota);
  Not g2(b, notb);
  Nand g3(nota, notb, out);
endmodule

module Xor(input a, b, output out);
  Nand g1(a, b, AnandB);
  Or   g2(a, b, AorB);
  And  g3(AnandB, AorB, out);
endmodule

module And(input a, b, output out);
  Nand g1(a, b, AnandB);
  Nand g2(AnandB, AnandB, out);
endmodule

module Or8Way(input[7:0] in, output out);
  Or g1(in[7], in[6], or76);
  Or g2(in[5], in[4], or54);
  Or g3(in[3], in[2], or32);
  Or g4(in[1], in[0], or10);
  Or g5(or76, or54, or74);
  Or g6(or32, or10, or30);
  Or g7(or74, or30, out);
endmodule
```

測試程式： gate_test.v

```verilog
`include "gate.v"

module main;
reg a, b;
wire abNand, aNot, abAnd, abOr, abXor;

Not  g1(a, aNot);
Nand g2(a, b, abNand);
And  g3(a, b, abAnd);
Or   g4(a, b, abOr);
Xor  g5(a, b, abXor);

initial
begin
  $monitor("%4dns a=%d b=%d aNot=%d abNand=%d abAnd=%d abOr=%d abXor=%d", $stime, a, b, aNot, abNand, abAnd, abOr, abXor);
  a  = 0;
  b  = 0;
end

always #50 begin
  a = a+1;
end

always #100 begin
  b = b+1;
end

initial #500 $finish;

endmodule
```

測試結果

```
D:\Dropbox\cccweb\db\n2t>iverilog gate_test.v -o gate_test

D:\Dropbox\cccweb\db\n2t>vvp gate_test
   0ns a=0 b=0 aNot=1 abNand=1 abAnd=0 abOr=0 abXor=0
  50ns a=1 b=0 aNot=0 abNand=1 abAnd=0 abOr=1 abXor=1
 100ns a=0 b=1 aNot=1 abNand=1 abAnd=0 abOr=1 abXor=1
 150ns a=1 b=1 aNot=0 abNand=0 abAnd=1 abOr=1 abXor=0
 200ns a=0 b=0 aNot=1 abNand=1 abAnd=0 abOr=0 abXor=0
 250ns a=1 b=0 aNot=0 abNand=1 abAnd=0 abOr=1 abXor=1
 300ns a=0 b=1 aNot=1 abNand=1 abAnd=0 abOr=1 abXor=1
 350ns a=1 b=1 aNot=0 abNand=0 abAnd=1 abOr=1 abXor=0
 400ns a=0 b=0 aNot=1 abNand=1 abAnd=0 abOr=0 abXor=0
 450ns a=1 b=0 aNot=0 abNand=1 abAnd=0 abOr=1 abXor=1
 500ns a=0 b=1 aNot=1 abNand=1 abAnd=0 abOr=1 abXor=1
```

### 16 位元邏輯閘

程式模組： gate16.v 

```verilog
`include "gate.v"

module Not16(input[15:0] in, output[15:0] out);
  Not g15(in[15], out[15]);
  Not g14(in[14], out[14]);
  Not g13(in[13], out[13]);
  Not g12(in[12], out[12]);
  Not g11(in[11], out[11]);
  Not g10(in[10], out[10]);
  Not g09(in[9], out[9]);
  Not g08(in[8], out[8]);
  Not g07(in[7], out[7]);
  Not g06(in[6], out[6]);
  Not g05(in[5], out[5]);
  Not g04(in[4], out[4]);
  Not g03(in[3], out[3]);
  Not g02(in[2], out[2]);
  Not g01(in[1], out[1]);
  Not g00(in[0], out[0]);
endmodule

module And16(input[15:0] a, b, output[15:0] out);
  And g15(a[15], b[15], out[15]);
  And g14(a[14], b[14], out[14]);
  And g13(a[13], b[13], out[13]);
  And g12(a[12], b[12], out[12]);
  And g11(a[11], b[11], out[11]);
  And g10(a[10], b[10], out[10]);
  And g09(a[9], b[9], out[9]);
  And g08(a[8], b[8], out[8]);
  And g07(a[7], b[7], out[7]);
  And g06(a[6], b[6], out[6]);
  And g05(a[5], b[5], out[5]);
  And g04(a[4], b[4], out[4]);
  And g03(a[3], b[3], out[3]);
  And g02(a[2], b[2], out[2]);
  And g01(a[1], b[1], out[1]);
  And g00(a[0], b[0], out[0]);
endmodule

module Or16(input[15:0] a, b, output[15:0] out);
  Or g15(a[15], b[15], out[15]);
  Or g14(a[14], b[14], out[14]);
  Or g13(a[13], b[13], out[13]);
  Or g12(a[12], b[12], out[12]);
  Or g11(a[11], b[11], out[11]);
  Or g10(a[10], b[10], out[10]);
  Or g09(a[9], b[9], out[9]);
  Or g08(a[8], b[8], out[8]);
  Or g07(a[7], b[7], out[7]);
  Or g06(a[6], b[6], out[6]);
  Or g05(a[5], b[5], out[5]);
  Or g04(a[4], b[4], out[4]);
  Or g03(a[3], b[3], out[3]);
  Or g02(a[2], b[2], out[2]);
  Or g01(a[1], b[1], out[1]);
  Or g00(a[0], b[0], out[0]);
endmodule
```

測試程式： gate16_test.v

```verilog
`include "gate16.v"

module main;
reg  [15:0] a,b;
wire [15:0] aNot, abAnd, abOr;

Not16  g1(a, aNot);
And16  g2(a, b, abAnd);
Or16   g3(a, b, abOr);

initial
begin
  $monitor("a  =%b\nb  =%b\nnot=%b\nand=%b\nor =%b", a, b, aNot, abAnd, abOr);
  a  = 16'b0011;
  b  = 16'b0101;
	$finish;
end

endmodule
```

測試結果

```
D:\Dropbox\cccweb\db\n2t>iverilog gate16_test.v -o gate16_test

D:\Dropbox\cccweb\db\n2t>vvp gate16_test
a  =0000000000000011
b  =0000000000000101
not=1111111111111100
and=0000000000000001
or =0000000000000111
```

### 多工器與解多工器 (MUX and DMUX)

程式模組： mux.v 

```verilog
`include "gate16.v"

module Mux(input a, b, sel, output out);
  Not g1(sel, nsel);
  And g2(a, nsel, o1);
  And g3(b, sel, o2);
  Or  g4(o1, o2, out);
endmodule

module DMux(input in, sel, output a, b);
  Not g1(sel, nsel);
  And g2(nsel, in, a);
  And g3(sel,  in, b);
endmodule

module Mux16(input[15:0] a, b, input sel, output[15:0] out);
  Mux g15(a[15], b[15], sel, out[15]);
  Mux g14(a[14], b[14], sel, out[14]);
  Mux g13(a[13], b[13], sel, out[13]);
  Mux g12(a[12], b[12], sel, out[12]);
  Mux g11(a[11], b[11], sel, out[11]);
  Mux g10(a[10], b[10], sel, out[10]);
  Mux g09(a[9],  b[9],  sel, out[9]);
  Mux g08(a[8],  b[8],  sel, out[8]);
  Mux g07(a[7],  b[7],  sel, out[7]);
  Mux g06(a[6],  b[6],  sel, out[6]);
  Mux g05(a[5],  b[5],  sel, out[5]);
  Mux g04(a[4],  b[4],  sel, out[4]);
  Mux g03(a[3],  b[3],  sel, out[3]);
  Mux g02(a[2],  b[2],  sel, out[2]);
  Mux g01(a[1],  b[1],  sel, out[1]);
  Mux g00(a[0],  b[0],  sel, out[0]);
endmodule

module Mux4Way16(input[15:0] a,b,c,d, input[1:0] sel, output[15:0] out);
  wire [15:0] outab, outcd;
  Mux16 g1(a, b, sel[0], outab);
  Mux16 g2(c, d, sel[0], outcd);
  Mux16 g3(outab, outcd, sel[1], out);
endmodule

module Mux8Way16(input[15:0] a,b,c,d,e,f,g,h, input[2:0] sel, output[15:0] out);
  wire [15:0] outad, outeh;
  Mux4Way16 g1(a, b, c, d, sel[1:0], outad);
  Mux4Way16 g2(e, f, g, h, sel[1:0], outeh);
  Mux16     g3(outad, outeh, sel[2], out);
endmodule

module DMux4Way(input in, input[1:0] sel, output a,b,c,d);
  Not  g1(sel[1], nsel1);
  Not  g2(sel[0], nsel0);
  And  g3(nsel1,  nsel0,  sel00);
  And  g4(nsel1,  sel[0], sel01);
  And  g5(sel[1], nsel0,  sel10);
  And  g6(sel[1], sel[0], sel11);
  DMux g7(in, sel00, d0, a);
  DMux g8(in, sel01, d1, b);
  DMux g9(in, sel11, d2, d);
  DMux g10(in, sel10, d3, c);
endmodule

module DMux8Way(input in, input[2:0] sel, output a,b,c,d,e,f,g,h);
  Not g1(sel[2], nsel2);
  And g2(in, sel[2], s2h);
  And g3(in, nsel2,  s2l);
  DMux4Way g4(s2h, sel[1:0], e, f, g, h);
  DMux4Way g5(s2l, sel[1:0], a, b, c, d);
endmodule

```

測試程式： mux_test.v

```verilog
`include "mux.v"

module main;
reg[15:0] a, b, c, d, e, f, g, h;
reg[2:0]  sel;
wire[15:0] mux2, mux4, mux8;
wire mux01, dmux0, dmux1;

Mux       g1(1'b0, 1'b1, sel[2], mux01);
DMux      g2(a[0], sel[2], dmux0, dmux1);
Mux16     g4(a, b, sel[0], mux2);
Mux4Way16 g5(a, b, c, d, sel[1:0], mux4);
Mux8Way16 g6(a, b, c, d, e, f, g, h, sel[2:0], mux8);

initial
begin
  $monitor("%4dns sel=%d mux2=%x mux4=%x mux8=%x", $stime, sel, mux2, mux4, mux8);
  a  = 16'h0;
  b  = 16'h1;
  c  = 16'h2;
  d  = 16'h3;
  e  = 16'h4;
  f  = 16'h5;
  g  = 16'h6;
  h  = 16'h7;
	sel = 0;
end

always #50 begin
  sel=sel+1;
end

initial #500 $finish;

endmodule
```

測試結果

```
D:\Dropbox\cccweb\db\n2t>iverilog mux_test.v -o mux_test

D:\Dropbox\cccweb\db\n2t>vvp mux_test
   0ns sel=0 mux2=0000 mux4=0000 mux8=0000
  50ns sel=1 mux2=0001 mux4=0001 mux8=0001
 100ns sel=2 mux2=0000 mux4=0002 mux8=0002
 150ns sel=3 mux2=0001 mux4=0003 mux8=0003
 200ns sel=4 mux2=0000 mux4=0000 mux8=0004
 250ns sel=5 mux2=0001 mux4=0001 mux8=0005
 300ns sel=6 mux2=0000 mux4=0002 mux8=0006
 350ns sel=7 mux2=0001 mux4=0003 mux8=0007
 400ns sel=0 mux2=0000 mux4=0000 mux8=0000
 450ns sel=1 mux2=0001 mux4=0001 mux8=0001
 500ns sel=2 mux2=0000 mux4=0002 mux8=0002
```

### 結語

這些閘的設計並不太困難，原理部份請參考下列文章或數位邏輯教科書。

* [少年科技人雜誌 / 2015年6月號 / Nand2Tetris 第 1 週 -- 布林函數](http://ccc.nqu.edu.tw/db/ymag201506/focus3.html)


