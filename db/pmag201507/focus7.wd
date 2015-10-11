## Nand2Tetris 第五週 -- 自製處理器與電腦

本週的作業是設計處理器 HackCPU 與電腦 HackComputer，其中還包含了可以與週邊連接的記憶體部份。Verilog 版的設計如下:


程式模組： computer.v 

```verilog
`include "memory.v"

module Memory(input[15:0] in, input clock, load, input[14:0] address, output[15:0] out);
  wire[15:0] outM, outS, outK, outSK;
	
  Not g1(address[14], N14);
  And g2(N14, load, Mload);
  And g3(address[14], load, Sload);
  
  RAM16K ram16k(in, clock, Mload, address[13:0], outM);
  RAM8K  screen(in, clock, Sload, address[12:0], outS);
  Register keyboard(16'h0F0F, clock, 1'b0, outK);
  
  Mux16 g4(outM, outSK, address[14], out);
  Mux16 g5(outS, outK,  address[13], outSK);
endmodule

module CPU(input[15:0] inM, I, input clock, reset, output[15:0] outM, output writeM, output[14:0] addressM, pc);
  wire[15:0] Ain, Aout, AorM, ALUout, Dout, pcOut, addressMOut;
  Or  g1(ng, zr, ngzr);   // ngzr = (ng|zr)
  Not g2(ngzr, g);     // g = out > 0 = !(ng|zr);  ng = out < 0;  zr = out = 0
  And g3(ng, I[2], passLT);    // ngLT = (ng&LT)
  And g4(zr, I[1], passEQ);    // zrEQ = (zr&EQ)
  And g5(g,  I[0], passGT);    // gGT = (g&GT)
  Or  g6(passLT, passEQ, passLE);
  Or  g7(passLE, passGT, pass);

  And g8(I[15], pass, PCload);     // PCload = I15&J
  
  // ALU
  Mux16 g9(Aout, inM, I[12], AorM); // Mux ALU in : cAorM = I[12]
  
  ALU alu(Dout, AorM, I[11], I[10], I[9], I[8], I[7], I[6], ALUout, zr, ng);
  
  PC pc1(Aout, clock, PCload, 1'b1, reset, pcOut);
	assign pc = pcOut[14:0];
  
  // A register
  Not g10(I[15], Atype);
  And g11(I[15], I[5], AluToA); // AluToA = I[15]&d1
  Or  g12(Atype, AluToA, Aload);
  
  Mux16 g13(I, ALUout, AluToA, Ain); // sel=I[15]
  Register A(Ain, clock, Aload, Aout);
  
  // D register
  And g14(I[15], I[4], Dload); // Aload = I[15]&d2
  Register D(ALUout, clock, Dload, Dout);
  
  // output
	assign addressM = Aout[14:0];
  And g16(I[15], I[3], writeM); // writeM = I[15] & d3
  And16 g17(ALUout, ALUout, outM);
endmodule

module Computer(input clock, reset);
  wire[15:0] inM, outM, I;
	wire[14:0] addressM, pc;
	
  Memory ram(inM, !clock, loadM, addressM, outM);
  ROM32K rom(pc, I);
  CPU    cpu(outM, I, clock, reset, inM, loadM, addressM, pc);	
endmodule

```

測試程式： computer_test.v

```verilog
`include "computer.v"

module main;
reg reset, clock;

Computer c(clock, reset);

integer i;

initial
begin
  $readmemb("sum.hack", c.rom.m);
  for (i=0; i < 32; i=i+1) begin
    $display("%4x: %x", i, c.rom.m[i]);
  end
  $monitor("%4dns clock=%d pc=%d I=%d A=%d D=%d M=%d", $stime, clock, c.pc, c.I, c.addressM, c.cpu.Dout, c.outM);
	clock = 0;
	#10 reset=1;
	#30 reset=0;
end

always #5 begin
  clock = clock + 1;
end

initial #1800 $finish;

endmodule
```

輸入檔 : sum.hack

```
0000000000010000  // 	@i // i refers to some RAM location
1110111111001000  // 	M=1 // i=1
0000000000010001  // 	@sum // sum refers to some RAM location
1110101010001000  // 	M=0 // sum=0
0000000000010000  // (LOOP)	@i
1111110000010000  // 	D=M // D = i
0000000000001010  // 	@10
1110010011010000  // 	D=D-A // D = i - 10
0000000000010010  // 	@END
1110001100000001  // 	D;JGT // If (i-100) > 0 goto END
0000000000010000  // 	@i
1111110000010000  // 	D=M // D = i
0000000000010001  // 	@sum
1111000010001000  // 	M=D+M // sum += i
0000000000010000  // 	@i
1111110111001000  // 	M=M+1 // i++
0000000000000100  // 	@LOOP
1110101010000111  // 	0;JMP // Got LOOP
0000000000010010  // (END)	@END
1110101010000111  // 	0;JMP // Infinite loop
```

測試結果

```
WARNING: computer_test.v:12: $readmemb(sum.hack): Not enough words in the file for the requested range [0:16383].
00000000: 0010
00000001: efc8
00000002: 0011
00000003: ea88
00000004: 0010
00000005: fc10
00000006: 000a
00000007: e4d0
00000008: 0012
00000009: e301
0000000a: 0010
0000000b: fc10
0000000c: 0011
0000000d: f088
0000000e: 0010
0000000f: fdc8
00000010: 0004
00000011: ea87
00000012: 0012
00000013: ea87
00000014: xxxx
00000015: xxxx
00000016: xxxx
00000017: xxxx
00000018: xxxx
00000019: xxxx
0000001a: xxxx
0000001b: xxxx
0000001c: xxxx
0000001d: xxxx
0000001e: xxxx
0000001f: xxxx
   0ns clock=0 pc=    x I=    x A=    x D=    x M=    x
   5ns clock=1 pc=    x I=    x A=    x D=    x M=    x
  10ns clock=0 pc=    x I=    x A=    x D=    x M=    x
  15ns clock=1 pc=    0 I=   16 A=    x D=    x M=    x
  20ns clock=0 pc=    0 I=   16 A=    x D=    x M=    x
  25ns clock=1 pc=    0 I=   16 A=   16 D=    x M=    x
  30ns clock=0 pc=    0 I=   16 A=   16 D=    x M=    x
  35ns clock=1 pc=    0 I=   16 A=   16 D=    x M=    x
  40ns clock=0 pc=    0 I=   16 A=   16 D=    x M=    x
  45ns clock=1 pc=    1 I=61384 A=   16 D=    x M=    x
  50ns clock=0 pc=    1 I=61384 A=   16 D=    x M=    1
  55ns clock=1 pc=    2 I=   17 A=   16 D=    x M=    1
  60ns clock=0 pc=    2 I=   17 A=   16 D=    x M=    1
  65ns clock=1 pc=    3 I=60040 A=   17 D=    x M=    x
  70ns clock=0 pc=    3 I=60040 A=   17 D=    x M=    0
  75ns clock=1 pc=    4 I=   16 A=   17 D=    x M=    0
  80ns clock=0 pc=    4 I=   16 A=   17 D=    x M=    0
  85ns clock=1 pc=    5 I=64528 A=   16 D=    x M=    1
  90ns clock=0 pc=    5 I=64528 A=   16 D=    x M=    1
  95ns clock=1 pc=    6 I=   10 A=   16 D=    1 M=    1
 100ns clock=0 pc=    6 I=   10 A=   16 D=    1 M=    1
 105ns clock=1 pc=    7 I=58576 A=   10 D=    1 M=    x
 110ns clock=0 pc=    7 I=58576 A=   10 D=    1 M=    x
 115ns clock=1 pc=    8 I=   18 A=   10 D=65527 M=    x
 120ns clock=0 pc=    8 I=   18 A=   10 D=65527 M=    x
 125ns clock=1 pc=    9 I=58113 A=   18 D=65527 M=    x
 130ns clock=0 pc=    9 I=58113 A=   18 D=65527 M=    x
 135ns clock=1 pc=   10 I=   16 A=   18 D=65527 M=    x
 140ns clock=0 pc=   10 I=   16 A=   18 D=65527 M=    x
 145ns clock=1 pc=   11 I=64528 A=   16 D=65527 M=    1
 150ns clock=0 pc=   11 I=64528 A=   16 D=65527 M=    1
 155ns clock=1 pc=   12 I=   17 A=   16 D=    1 M=    1
 160ns clock=0 pc=   12 I=   17 A=   16 D=    1 M=    1
 165ns clock=1 pc=   13 I=61576 A=   17 D=    1 M=    0
 170ns clock=0 pc=   13 I=61576 A=   17 D=    1 M=    1
 175ns clock=1 pc=   14 I=   16 A=   17 D=    1 M=    1
 180ns clock=0 pc=   14 I=   16 A=   17 D=    1 M=    1
 185ns clock=1 pc=   15 I=64968 A=   16 D=    1 M=    1
 190ns clock=0 pc=   15 I=64968 A=   16 D=    1 M=    2
 195ns clock=1 pc=   16 I=    4 A=   16 D=    1 M=    2
 200ns clock=0 pc=   16 I=    4 A=   16 D=    1 M=    2
 205ns clock=1 pc=   17 I=60039 A=    4 D=    1 M=    x
 210ns clock=0 pc=   17 I=60039 A=    4 D=    1 M=    x
 215ns clock=1 pc=    4 I=   16 A=    4 D=    1 M=    x
 220ns clock=0 pc=    4 I=   16 A=    4 D=    1 M=    x
 225ns clock=1 pc=    5 I=64528 A=   16 D=    1 M=    2
 230ns clock=0 pc=    5 I=64528 A=   16 D=    1 M=    2
 235ns clock=1 pc=    6 I=   10 A=   16 D=    2 M=    2
 240ns clock=0 pc=    6 I=   10 A=   16 D=    2 M=    2
 245ns clock=1 pc=    7 I=58576 A=   10 D=    2 M=    x
 250ns clock=0 pc=    7 I=58576 A=   10 D=    2 M=    x
 255ns clock=1 pc=    8 I=   18 A=   10 D=65528 M=    x
 260ns clock=0 pc=    8 I=   18 A=   10 D=65528 M=    x
 265ns clock=1 pc=    9 I=58113 A=   18 D=65528 M=    x
 270ns clock=0 pc=    9 I=58113 A=   18 D=65528 M=    x
 275ns clock=1 pc=   10 I=   16 A=   18 D=65528 M=    x
 280ns clock=0 pc=   10 I=   16 A=   18 D=65528 M=    x
 285ns clock=1 pc=   11 I=64528 A=   16 D=65528 M=    2
 290ns clock=0 pc=   11 I=64528 A=   16 D=65528 M=    2
 295ns clock=1 pc=   12 I=   17 A=   16 D=    2 M=    2
 300ns clock=0 pc=   12 I=   17 A=   16 D=    2 M=    2
 305ns clock=1 pc=   13 I=61576 A=   17 D=    2 M=    1
 310ns clock=0 pc=   13 I=61576 A=   17 D=    2 M=    3
 315ns clock=1 pc=   14 I=   16 A=   17 D=    2 M=    3
 320ns clock=0 pc=   14 I=   16 A=   17 D=    2 M=    3
 325ns clock=1 pc=   15 I=64968 A=   16 D=    2 M=    2
 330ns clock=0 pc=   15 I=64968 A=   16 D=    2 M=    3
 335ns clock=1 pc=   16 I=    4 A=   16 D=    2 M=    3
 340ns clock=0 pc=   16 I=    4 A=   16 D=    2 M=    3
 345ns clock=1 pc=   17 I=60039 A=    4 D=    2 M=    x
 350ns clock=0 pc=   17 I=60039 A=    4 D=    2 M=    x
 355ns clock=1 pc=    4 I=   16 A=    4 D=    2 M=    x
 360ns clock=0 pc=    4 I=   16 A=    4 D=    2 M=    x
 365ns clock=1 pc=    5 I=64528 A=   16 D=    2 M=    3
 370ns clock=0 pc=    5 I=64528 A=   16 D=    2 M=    3
 375ns clock=1 pc=    6 I=   10 A=   16 D=    3 M=    3
 380ns clock=0 pc=    6 I=   10 A=   16 D=    3 M=    3
 385ns clock=1 pc=    7 I=58576 A=   10 D=    3 M=    x
 390ns clock=0 pc=    7 I=58576 A=   10 D=    3 M=    x
 395ns clock=1 pc=    8 I=   18 A=   10 D=65529 M=    x
 400ns clock=0 pc=    8 I=   18 A=   10 D=65529 M=    x
 405ns clock=1 pc=    9 I=58113 A=   18 D=65529 M=    x
 410ns clock=0 pc=    9 I=58113 A=   18 D=65529 M=    x
 415ns clock=1 pc=   10 I=   16 A=   18 D=65529 M=    x
 420ns clock=0 pc=   10 I=   16 A=   18 D=65529 M=    x
 425ns clock=1 pc=   11 I=64528 A=   16 D=65529 M=    3
 430ns clock=0 pc=   11 I=64528 A=   16 D=65529 M=    3
 435ns clock=1 pc=   12 I=   17 A=   16 D=    3 M=    3
 440ns clock=0 pc=   12 I=   17 A=   16 D=    3 M=    3
 445ns clock=1 pc=   13 I=61576 A=   17 D=    3 M=    3
 450ns clock=0 pc=   13 I=61576 A=   17 D=    3 M=    6
 455ns clock=1 pc=   14 I=   16 A=   17 D=    3 M=    6
 460ns clock=0 pc=   14 I=   16 A=   17 D=    3 M=    6
 465ns clock=1 pc=   15 I=64968 A=   16 D=    3 M=    3
 470ns clock=0 pc=   15 I=64968 A=   16 D=    3 M=    4
 475ns clock=1 pc=   16 I=    4 A=   16 D=    3 M=    4
 480ns clock=0 pc=   16 I=    4 A=   16 D=    3 M=    4
 485ns clock=1 pc=   17 I=60039 A=    4 D=    3 M=    x
 490ns clock=0 pc=   17 I=60039 A=    4 D=    3 M=    x
 495ns clock=1 pc=    4 I=   16 A=    4 D=    3 M=    x
 500ns clock=0 pc=    4 I=   16 A=    4 D=    3 M=    x
 505ns clock=1 pc=    5 I=64528 A=   16 D=    3 M=    4
 510ns clock=0 pc=    5 I=64528 A=   16 D=    3 M=    4
 515ns clock=1 pc=    6 I=   10 A=   16 D=    4 M=    4
 520ns clock=0 pc=    6 I=   10 A=   16 D=    4 M=    4
 525ns clock=1 pc=    7 I=58576 A=   10 D=    4 M=    x
 530ns clock=0 pc=    7 I=58576 A=   10 D=    4 M=    x
 535ns clock=1 pc=    8 I=   18 A=   10 D=65530 M=    x
 540ns clock=0 pc=    8 I=   18 A=   10 D=65530 M=    x
 545ns clock=1 pc=    9 I=58113 A=   18 D=65530 M=    x
 550ns clock=0 pc=    9 I=58113 A=   18 D=65530 M=    x
 555ns clock=1 pc=   10 I=   16 A=   18 D=65530 M=    x
 560ns clock=0 pc=   10 I=   16 A=   18 D=65530 M=    x
 565ns clock=1 pc=   11 I=64528 A=   16 D=65530 M=    4
 570ns clock=0 pc=   11 I=64528 A=   16 D=65530 M=    4
 575ns clock=1 pc=   12 I=   17 A=   16 D=    4 M=    4
 580ns clock=0 pc=   12 I=   17 A=   16 D=    4 M=    4
 585ns clock=1 pc=   13 I=61576 A=   17 D=    4 M=    6
 590ns clock=0 pc=   13 I=61576 A=   17 D=    4 M=   10
 595ns clock=1 pc=   14 I=   16 A=   17 D=    4 M=   10
 600ns clock=0 pc=   14 I=   16 A=   17 D=    4 M=   10
 605ns clock=1 pc=   15 I=64968 A=   16 D=    4 M=    4
 610ns clock=0 pc=   15 I=64968 A=   16 D=    4 M=    5
 615ns clock=1 pc=   16 I=    4 A=   16 D=    4 M=    5
 620ns clock=0 pc=   16 I=    4 A=   16 D=    4 M=    5
 625ns clock=1 pc=   17 I=60039 A=    4 D=    4 M=    x
 630ns clock=0 pc=   17 I=60039 A=    4 D=    4 M=    x
 635ns clock=1 pc=    4 I=   16 A=    4 D=    4 M=    x
 640ns clock=0 pc=    4 I=   16 A=    4 D=    4 M=    x
 645ns clock=1 pc=    5 I=64528 A=   16 D=    4 M=    5
 650ns clock=0 pc=    5 I=64528 A=   16 D=    4 M=    5
 655ns clock=1 pc=    6 I=   10 A=   16 D=    5 M=    5
 660ns clock=0 pc=    6 I=   10 A=   16 D=    5 M=    5
 665ns clock=1 pc=    7 I=58576 A=   10 D=    5 M=    x
 670ns clock=0 pc=    7 I=58576 A=   10 D=    5 M=    x
 675ns clock=1 pc=    8 I=   18 A=   10 D=65531 M=    x
 680ns clock=0 pc=    8 I=   18 A=   10 D=65531 M=    x
 685ns clock=1 pc=    9 I=58113 A=   18 D=65531 M=    x
 690ns clock=0 pc=    9 I=58113 A=   18 D=65531 M=    x
 695ns clock=1 pc=   10 I=   16 A=   18 D=65531 M=    x
 700ns clock=0 pc=   10 I=   16 A=   18 D=65531 M=    x
 705ns clock=1 pc=   11 I=64528 A=   16 D=65531 M=    5
 710ns clock=0 pc=   11 I=64528 A=   16 D=65531 M=    5
 715ns clock=1 pc=   12 I=   17 A=   16 D=    5 M=    5
 720ns clock=0 pc=   12 I=   17 A=   16 D=    5 M=    5
 725ns clock=1 pc=   13 I=61576 A=   17 D=    5 M=   10
 730ns clock=0 pc=   13 I=61576 A=   17 D=    5 M=   15
 735ns clock=1 pc=   14 I=   16 A=   17 D=    5 M=   15
 740ns clock=0 pc=   14 I=   16 A=   17 D=    5 M=   15
 745ns clock=1 pc=   15 I=64968 A=   16 D=    5 M=    5
 750ns clock=0 pc=   15 I=64968 A=   16 D=    5 M=    6
 755ns clock=1 pc=   16 I=    4 A=   16 D=    5 M=    6
 760ns clock=0 pc=   16 I=    4 A=   16 D=    5 M=    6
 765ns clock=1 pc=   17 I=60039 A=    4 D=    5 M=    x
 770ns clock=0 pc=   17 I=60039 A=    4 D=    5 M=    x
 775ns clock=1 pc=    4 I=   16 A=    4 D=    5 M=    x
 780ns clock=0 pc=    4 I=   16 A=    4 D=    5 M=    x
 785ns clock=1 pc=    5 I=64528 A=   16 D=    5 M=    6
 790ns clock=0 pc=    5 I=64528 A=   16 D=    5 M=    6
 795ns clock=1 pc=    6 I=   10 A=   16 D=    6 M=    6
 800ns clock=0 pc=    6 I=   10 A=   16 D=    6 M=    6
 805ns clock=1 pc=    7 I=58576 A=   10 D=    6 M=    x
 810ns clock=0 pc=    7 I=58576 A=   10 D=    6 M=    x
 815ns clock=1 pc=    8 I=   18 A=   10 D=65532 M=    x
 820ns clock=0 pc=    8 I=   18 A=   10 D=65532 M=    x
 825ns clock=1 pc=    9 I=58113 A=   18 D=65532 M=    x
 830ns clock=0 pc=    9 I=58113 A=   18 D=65532 M=    x
 835ns clock=1 pc=   10 I=   16 A=   18 D=65532 M=    x
 840ns clock=0 pc=   10 I=   16 A=   18 D=65532 M=    x
 845ns clock=1 pc=   11 I=64528 A=   16 D=65532 M=    6
 850ns clock=0 pc=   11 I=64528 A=   16 D=65532 M=    6
 855ns clock=1 pc=   12 I=   17 A=   16 D=    6 M=    6
 860ns clock=0 pc=   12 I=   17 A=   16 D=    6 M=    6
 865ns clock=1 pc=   13 I=61576 A=   17 D=    6 M=   15
 870ns clock=0 pc=   13 I=61576 A=   17 D=    6 M=   21
 875ns clock=1 pc=   14 I=   16 A=   17 D=    6 M=   21
 880ns clock=0 pc=   14 I=   16 A=   17 D=    6 M=   21
 885ns clock=1 pc=   15 I=64968 A=   16 D=    6 M=    6
 890ns clock=0 pc=   15 I=64968 A=   16 D=    6 M=    7
 895ns clock=1 pc=   16 I=    4 A=   16 D=    6 M=    7
 900ns clock=0 pc=   16 I=    4 A=   16 D=    6 M=    7
 905ns clock=1 pc=   17 I=60039 A=    4 D=    6 M=    x
 910ns clock=0 pc=   17 I=60039 A=    4 D=    6 M=    x
 915ns clock=1 pc=    4 I=   16 A=    4 D=    6 M=    x
 920ns clock=0 pc=    4 I=   16 A=    4 D=    6 M=    x
 925ns clock=1 pc=    5 I=64528 A=   16 D=    6 M=    7
 930ns clock=0 pc=    5 I=64528 A=   16 D=    6 M=    7
 935ns clock=1 pc=    6 I=   10 A=   16 D=    7 M=    7
 940ns clock=0 pc=    6 I=   10 A=   16 D=    7 M=    7
 945ns clock=1 pc=    7 I=58576 A=   10 D=    7 M=    x
 950ns clock=0 pc=    7 I=58576 A=   10 D=    7 M=    x
 955ns clock=1 pc=    8 I=   18 A=   10 D=65533 M=    x
 960ns clock=0 pc=    8 I=   18 A=   10 D=65533 M=    x
 965ns clock=1 pc=    9 I=58113 A=   18 D=65533 M=    x
 970ns clock=0 pc=    9 I=58113 A=   18 D=65533 M=    x
 975ns clock=1 pc=   10 I=   16 A=   18 D=65533 M=    x
 980ns clock=0 pc=   10 I=   16 A=   18 D=65533 M=    x
 985ns clock=1 pc=   11 I=64528 A=   16 D=65533 M=    7
 990ns clock=0 pc=   11 I=64528 A=   16 D=65533 M=    7
 995ns clock=1 pc=   12 I=   17 A=   16 D=    7 M=    7
1000ns clock=0 pc=   12 I=   17 A=   16 D=    7 M=    7
1005ns clock=1 pc=   13 I=61576 A=   17 D=    7 M=   21
1010ns clock=0 pc=   13 I=61576 A=   17 D=    7 M=   28
1015ns clock=1 pc=   14 I=   16 A=   17 D=    7 M=   28
1020ns clock=0 pc=   14 I=   16 A=   17 D=    7 M=   28
1025ns clock=1 pc=   15 I=64968 A=   16 D=    7 M=    7
1030ns clock=0 pc=   15 I=64968 A=   16 D=    7 M=    8
1035ns clock=1 pc=   16 I=    4 A=   16 D=    7 M=    8
1040ns clock=0 pc=   16 I=    4 A=   16 D=    7 M=    8
1045ns clock=1 pc=   17 I=60039 A=    4 D=    7 M=    x
1050ns clock=0 pc=   17 I=60039 A=    4 D=    7 M=    x
1055ns clock=1 pc=    4 I=   16 A=    4 D=    7 M=    x
1060ns clock=0 pc=    4 I=   16 A=    4 D=    7 M=    x
1065ns clock=1 pc=    5 I=64528 A=   16 D=    7 M=    8
1070ns clock=0 pc=    5 I=64528 A=   16 D=    7 M=    8
1075ns clock=1 pc=    6 I=   10 A=   16 D=    8 M=    8
1080ns clock=0 pc=    6 I=   10 A=   16 D=    8 M=    8
1085ns clock=1 pc=    7 I=58576 A=   10 D=    8 M=    x
1090ns clock=0 pc=    7 I=58576 A=   10 D=    8 M=    x
1095ns clock=1 pc=    8 I=   18 A=   10 D=65534 M=    x
1100ns clock=0 pc=    8 I=   18 A=   10 D=65534 M=    x
1105ns clock=1 pc=    9 I=58113 A=   18 D=65534 M=    x
1110ns clock=0 pc=    9 I=58113 A=   18 D=65534 M=    x
1115ns clock=1 pc=   10 I=   16 A=   18 D=65534 M=    x
1120ns clock=0 pc=   10 I=   16 A=   18 D=65534 M=    x
1125ns clock=1 pc=   11 I=64528 A=   16 D=65534 M=    8
1130ns clock=0 pc=   11 I=64528 A=   16 D=65534 M=    8
1135ns clock=1 pc=   12 I=   17 A=   16 D=    8 M=    8
1140ns clock=0 pc=   12 I=   17 A=   16 D=    8 M=    8
1145ns clock=1 pc=   13 I=61576 A=   17 D=    8 M=   28
1150ns clock=0 pc=   13 I=61576 A=   17 D=    8 M=   36
1155ns clock=1 pc=   14 I=   16 A=   17 D=    8 M=   36
1160ns clock=0 pc=   14 I=   16 A=   17 D=    8 M=   36
1165ns clock=1 pc=   15 I=64968 A=   16 D=    8 M=    8
1170ns clock=0 pc=   15 I=64968 A=   16 D=    8 M=    9
1175ns clock=1 pc=   16 I=    4 A=   16 D=    8 M=    9
1180ns clock=0 pc=   16 I=    4 A=   16 D=    8 M=    9
1185ns clock=1 pc=   17 I=60039 A=    4 D=    8 M=    x
1190ns clock=0 pc=   17 I=60039 A=    4 D=    8 M=    x
1195ns clock=1 pc=    4 I=   16 A=    4 D=    8 M=    x
1200ns clock=0 pc=    4 I=   16 A=    4 D=    8 M=    x
1205ns clock=1 pc=    5 I=64528 A=   16 D=    8 M=    9
1210ns clock=0 pc=    5 I=64528 A=   16 D=    8 M=    9
1215ns clock=1 pc=    6 I=   10 A=   16 D=    9 M=    9
1220ns clock=0 pc=    6 I=   10 A=   16 D=    9 M=    9
1225ns clock=1 pc=    7 I=58576 A=   10 D=    9 M=    x
1230ns clock=0 pc=    7 I=58576 A=   10 D=    9 M=    x
1235ns clock=1 pc=    8 I=   18 A=   10 D=65535 M=    x
1240ns clock=0 pc=    8 I=   18 A=   10 D=65535 M=    x
1245ns clock=1 pc=    9 I=58113 A=   18 D=65535 M=    x
1250ns clock=0 pc=    9 I=58113 A=   18 D=65535 M=    x
1255ns clock=1 pc=   10 I=   16 A=   18 D=65535 M=    x
1260ns clock=0 pc=   10 I=   16 A=   18 D=65535 M=    x
1265ns clock=1 pc=   11 I=64528 A=   16 D=65535 M=    9
1270ns clock=0 pc=   11 I=64528 A=   16 D=65535 M=    9
1275ns clock=1 pc=   12 I=   17 A=   16 D=    9 M=    9
1280ns clock=0 pc=   12 I=   17 A=   16 D=    9 M=    9
1285ns clock=1 pc=   13 I=61576 A=   17 D=    9 M=   36
1290ns clock=0 pc=   13 I=61576 A=   17 D=    9 M=   45
1295ns clock=1 pc=   14 I=   16 A=   17 D=    9 M=   45
1300ns clock=0 pc=   14 I=   16 A=   17 D=    9 M=   45
1305ns clock=1 pc=   15 I=64968 A=   16 D=    9 M=    9
1310ns clock=0 pc=   15 I=64968 A=   16 D=    9 M=   10
1315ns clock=1 pc=   16 I=    4 A=   16 D=    9 M=   10
1320ns clock=0 pc=   16 I=    4 A=   16 D=    9 M=   10
1325ns clock=1 pc=   17 I=60039 A=    4 D=    9 M=    x
1330ns clock=0 pc=   17 I=60039 A=    4 D=    9 M=    x
1335ns clock=1 pc=    4 I=   16 A=    4 D=    9 M=    x
1340ns clock=0 pc=    4 I=   16 A=    4 D=    9 M=    x
1345ns clock=1 pc=    5 I=64528 A=   16 D=    9 M=   10
1350ns clock=0 pc=    5 I=64528 A=   16 D=    9 M=   10
1355ns clock=1 pc=    6 I=   10 A=   16 D=   10 M=   10
1360ns clock=0 pc=    6 I=   10 A=   16 D=   10 M=   10
1365ns clock=1 pc=    7 I=58576 A=   10 D=   10 M=    x
1370ns clock=0 pc=    7 I=58576 A=   10 D=   10 M=    x
1375ns clock=1 pc=    8 I=   18 A=   10 D=    0 M=    x
1380ns clock=0 pc=    8 I=   18 A=   10 D=    0 M=    x
1385ns clock=1 pc=    9 I=58113 A=   18 D=    0 M=    x
1390ns clock=0 pc=    9 I=58113 A=   18 D=    0 M=    x
1395ns clock=1 pc=   10 I=   16 A=   18 D=    0 M=    x
1400ns clock=0 pc=   10 I=   16 A=   18 D=    0 M=    x
1405ns clock=1 pc=   11 I=64528 A=   16 D=    0 M=   10
1410ns clock=0 pc=   11 I=64528 A=   16 D=    0 M=   10
1415ns clock=1 pc=   12 I=   17 A=   16 D=   10 M=   10
1420ns clock=0 pc=   12 I=   17 A=   16 D=   10 M=   10
1425ns clock=1 pc=   13 I=61576 A=   17 D=   10 M=   45
1430ns clock=0 pc=   13 I=61576 A=   17 D=   10 M=   55
1435ns clock=1 pc=   14 I=   16 A=   17 D=   10 M=   55
1440ns clock=0 pc=   14 I=   16 A=   17 D=   10 M=   55
1445ns clock=1 pc=   15 I=64968 A=   16 D=   10 M=   10
1450ns clock=0 pc=   15 I=64968 A=   16 D=   10 M=   11
1455ns clock=1 pc=   16 I=    4 A=   16 D=   10 M=   11
1460ns clock=0 pc=   16 I=    4 A=   16 D=   10 M=   11
1465ns clock=1 pc=   17 I=60039 A=    4 D=   10 M=    x
1470ns clock=0 pc=   17 I=60039 A=    4 D=   10 M=    x
1475ns clock=1 pc=    4 I=   16 A=    4 D=   10 M=    x
1480ns clock=0 pc=    4 I=   16 A=    4 D=   10 M=    x
1485ns clock=1 pc=    5 I=64528 A=   16 D=   10 M=   11
1490ns clock=0 pc=    5 I=64528 A=   16 D=   10 M=   11
1495ns clock=1 pc=    6 I=   10 A=   16 D=   11 M=   11
1500ns clock=0 pc=    6 I=   10 A=   16 D=   11 M=   11
1505ns clock=1 pc=    7 I=58576 A=   10 D=   11 M=    x
1510ns clock=0 pc=    7 I=58576 A=   10 D=   11 M=    x
1515ns clock=1 pc=    8 I=   18 A=   10 D=    1 M=    x
1520ns clock=0 pc=    8 I=   18 A=   10 D=    1 M=    x
1525ns clock=1 pc=    9 I=58113 A=   18 D=    1 M=    x
1530ns clock=0 pc=    9 I=58113 A=   18 D=    1 M=    x
1535ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1540ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1545ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1550ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1555ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1560ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1565ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1570ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1575ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1580ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1585ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1590ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1595ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1600ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1605ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1610ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1615ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1620ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1625ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1630ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1635ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1640ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1645ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1650ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1655ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1660ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1665ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1670ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1675ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1680ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1685ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1690ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1695ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1700ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1705ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1710ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1715ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1720ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1725ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1730ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1735ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1740ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1745ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1750ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1755ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1760ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1765ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1770ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1775ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1780ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
1785ns clock=1 pc=   19 I=60039 A=   18 D=    1 M=    x
1790ns clock=0 pc=   19 I=60039 A=   18 D=    1 M=    x
1795ns clock=1 pc=   18 I=   18 A=   18 D=    1 M=    x
1800ns clock=0 pc=   18 I=   18 A=   18 D=    1 M=    x
```

### 結語

您可以看到上述的輸出當中有 55 這個數字，這代表 1+...+10 = 55 的計算結果是正確的，也就是處理器可以正常的執行 sum.hack 程式了。


