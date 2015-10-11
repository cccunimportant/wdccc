## Nand2Tetris 第 8 週 -- VM II: Program Control

接著在第 8 週的課程中，我們將完成整個虛擬碼轉組合語言的程式，以下是 Nand2tetris 的習題內容。

### 第 1 題: BasicLoop.vm 轉為 BasicLoop.asm

本題目的在測試跳躍指令!

輸入: BasicLoop.vm

```
push constant 0    
pop local 0        // initialize sum = 0
label LOOP_START
push argument 0    
push local 0
add
pop local 0	   // sum = sum + counter
push argument 0
push constant 1
sub
pop argument 0     // counter--
push argument 0
if-goto LOOP_START // If counter != 0, goto LOOP_START
push local 0

```

這一題的重點在於引入了 if-goto 這個指令，以下是該指令的翻譯方法。

```
// if-goto LOOP_START // If stack[top]>0, goto LOOP_START
@SP          
M=M-1                 // *SP = *SP-1
@SP
A=M                   // A=M[0]=*SP
D=M                   // D=M[A]=M[*SP] = 堆疊最上面的資料
@LOOP_START
D;JNE                 // if D != 0 goto LOOP_START
```

### 第 2 題: FibonacciSeries.vm 轉為 FibonacciSeries.asm 

輸入: FibonacciSeries.vm

```
push argument 1
pop pointer 1           // that = argument[1]

push constant 0
pop that 0              // first element = 0
push constant 1
pop that 1              // second element = 1

push argument 0
push constant 2
sub
pop argument 0          // num_of_elements -= 2 (first 2 elements are set)

label MAIN_LOOP_START

push argument 0
if-goto COMPUTE_ELEMENT // if num_of_elements > 0, goto COMPUTE_ELEMENT
goto END_PROGRAM        // otherwise, goto END_PROGRAM

label COMPUTE_ELEMENT

push that 0
push that 1
add
pop that 2              // that[2] = that[0] + that[1]

push pointer 1
push constant 1
add
pop pointer 1           // that += 1

push argument 0
push constant 1
sub
pop argument 0          // num_of_elements--

goto MAIN_LOOP_START

label END_PROGRAM
```

這題加入了 goto 指令，像是 goto MAIN_LOOP_START 與 goto END_PROGRAM 等等，以下我們將以 goto MAIN_LOOP_START 為例進行翻譯。

```
// goto MAIN_LOOP_START
@MAIN_LOOP_START
0;JMP
```

goto 的處理很簡單，基本上就是在 A 指令後面加 JMP 指令就行了。

### 第 3 題: SimpleFunction.vm 轉為 SimpleFunction.asm

輸入: SimpleFunction.vm

```
function SimpleFunction.test 2
push local 0
push local 1
add
not
push argument 0
add
push argument 1
sub
return

```

這題目的在測試函數呼叫，呼叫時必須先保留區域變數的空間，然後在離開前清空這些區域變數與呼叫前推入的參數，然後再將返回值放到堆疊頂端傳回。

這題的 return 多了設定 LCL, ARG, THIS, THAT 等系統區段變數的動作，原因是 call 呼叫的時候會推入這些變數儲存，所以才需在離開前將這些變數恢復。(關於 call 的內容請看下一題)

```
// function SimpleFunction.test 2 // 共有兩個參數
(SimpleFunction.test)
@0       // 在堆疊中保留第一個參數的空間，並且填入 0
D=A      // D=0
@SP
A=M      // A=M[0]=*SP
M=D      // M[*SP] = D = 0
@SP
M=M+1    // *SP = *SP+1
@0       // 在堆疊中保留第二個參數的空間，並且填入 0
D=A      // ...
@SP
A=M
M=D
@SP
M=M+1
...
// return
@R1       // R_FRAME = R_LCL
D=M
@R13
M=D
@5        // A=5
A=D-A     // A=FRAME-5
D=M       // D=M
@R14      // RET=*(FRAME-5)
M=D
@SP
M=M-1
@ARG      // *ARG=return value
AD=M
@R15
M=D
@SP
A=M
D=M       // D=ARG
@R15
A=M
M=D
@R2
D=M
@R0
M=D+1     // SP=ARG+1
@R13
D=M
D=D-1 
@R13
M=D
A=D
D=M
@R4
M=D       // THAT=*(FRAME-1)
@R13
D=M
D=D-1
@R13
M=D
A=D
D=M
@R3       // THIS=*(FRAME-2)
M=D
@R13
D=M
D=D-1
@R13
M=D
A=D
D=M
@R2      // ARG=*(FRAME-3)
M=D
@R13
D=M
D=D-1
@R13
M=D
A=D
D=M
@R1      // LCL=*(FRAME-4)
M=D
@R13
D=M
D=D-1
@R13
M=D
A=D      // A=RET
D=M
@R14
M=D
0;JMP    // goto RET
```

### 第 4 題: NestedCall

本題目的在測試多層函數呼叫!

輸入:  Sys.vm

```
function Sys.init 0
call Sys.main 0
pop temp 1
label LOOP
goto LOOP

// Sys.main() calls Sys.add12(123) and stores return value (135) in temp 0.
// Returns 456.

function Sys.main 0
push constant 123
call Sys.add12 1
pop temp 0
push constant 246
return

// Sys.add12(int x) returns x+12.
// It allocates 3 words of local storage to test the deallocation of local
// storage during the return.

function Sys.add12 3
push argument 0
push constant 12
add
return
```

其中的 call 是先前沒做過的，以 call Sys.add12 1 這個指令為例，翻譯成 HackCPU 組合語言如下：

```
// call Sys.add12 1
@LABEL3
D=A
@SP          // push return_address
A=M
M=D
@SP
M=M+1
@R1          // push LCL
D=M
@SP
A=M
M=D
@SP
M=M+1
@R2          // push ARG
D=M
@SP
A=M
M=D
@SP
M=M+1
@R3          // push THIS
D=M
@SP
A=M
M=D
@SP
M=M+1
@R4          // push THAT
D=M
@SP
A=M
M=D
@SP
M=M+1
@6           // ARG=SP-n-5 = SP - 6       
D=A
@R0
A=M
AD=A-D
@R2
M=D
@R0
D=M
@R1          // LCL=SP 
M=D
@Sys.add12   // goto function_name
0;JMP
(LABEL3)     // (return_address)
```

### 第 5 題: FibonacciElement

本題目的在測試啟動程式與遞迴呼叫!

輸入檔有 Main.vm 與 Sys.vm 等兩個，您應該寫一個程式可以將某資料夾下的所有 .vm 檔案都轉為 .asm 檔。

只要您上述的 function, call, return 等指令都實作正確，這題就可以順利通過了。

### 第 6 題: StaticsTest

本題目的在測試靜態變數的使用。

輸入檔有 Class1.vm , Class2.vm 與 Sys.vm  等三個，您應該寫一個程式可以將某資料夾下的所有 .vm 檔案都轉為 .asm 檔。

輸入: Class1.vm

```
function Class1.set 0
push argument 0
pop static 0
push argument 1
pop static 1
push constant 0
return

// Returns static[0] - static[1].
function Class1.get 0
push static 0
push static 1
sub
return
```

這題主要在測試 static 變數的 push, pop 處理，以 push static 1, pop static 1 為例，轉換成組合語言後如下所示。

```
// push static 1
@Class1.1    // 這裡的變數命名 Class1.1 是因為用檔名 Class1 當作靜態變數的前置名稱，加上變數名稱 1 之後，就成了 Class1.1 了。
D=M          // D=*Class1.1
@SP
A=M   
M=D          // M[*SP] = D = *Class1.1
@SP
M=M+1        // *SP=*SP+1

// pop static 1
@SP
M=M-1        // *SP=*SP-1
@SP
A=M
D=M          // D = M[*SP]
@Class1.1
M=D          // M[*Class1.1] = D
```

相較於前面幾題，這題算是相當簡單的了。

### 結語

在本文中我們僅列出少部分結果，以免直接揭露答案，希望這些結果讓您可以稍微了解整個專案到底在做甚麼，並進一步思考該如何寫出這些程式。

