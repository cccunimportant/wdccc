## Nand2Tetris 第 12 週 -- 作業系統

本文程式來自 <https://github.com/havivha/Nand2Tetris/tree/master/12> ，使用時請注意遵守開源授權。

關於 nand2tetris 第 12 週的內容與解說，請參考下列文章。

* [少年科技人雜誌 / 2015年8月號 / Nand2Tetris 第 12 週 -- Operating System](http://ccc.nqu.edu.tw/db/ymag201508/focus7.html)

在本文中，我們主要補充的是實作的方法。我們採用 JavaScript 撰寫，並用 node.js 環境進行測試。
檔案: Array.jack

```
// Represents an array. Can be used to hold any type of object.
class Array {

    // Constructs a new Array of the given size.
    function Array new(int size) {
        return Memory.alloc(size);
    }

    // De-allocates the array and frees its space.
    method void dispose() {
        do Memory.deAlloc(this);
        return;
    }
}
```


檔案: Memory.jack

```
class Memory {
    static Array memory;
    static Array freeList;
    static Array NO_BLOCK;
    
    // Free block structure:
    // word 0: free block size including 2 header words
    // word 1: Next free block ptr
    static int FL_LENGTH; // freeList.length index
    static int FL_NEXT;   // freeList.next index
    
    // Alloc block structure:
    // word 0: alloc block size including 1 header word
    // word 1..size: allocated block
    static int ALLOC_SIZE;// alloc block size index relative to start of allocated block
    
    /** Initializes memory parameters. */
    function void init() {
        let memory = 0;
        let freeList = 2048;
        let NO_BLOCK = 16384;   // means no block found
        let FL_LENGTH = 0;
        let FL_NEXT = 1;
        let ALLOC_SIZE = -1;
        let freeList[FL_LENGTH] = 16384-2048;
        let freeList[FL_NEXT] = null;
        return;
    }

    /** Returns the value of the main memory at the given address. */
    function int peek(int address) {
        return memory[address];
    }

    /** Sets the value of the main memory at this address
     *  to the given value. */
    function void poke(int address, int value) {
        let memory[address] = value;
        return;
    }

    /** finds and allocates from the heap a memory block of the 
     *  specified size and returns a reference to its base address. */
    function Array alloc(int size) {
        var Array prev_block;
        var Array found_block;
        
        let prev_block = Memory.best_fit(size);             // prev_block is the block before the found block
        if( prev_block = NO_BLOCK ) {
            let found_block = null;    // none found
        }
        else {
            if( prev_block = null ) {
                let found_block = freeList;                 // New block is at the beginning of the freeList
                let freeList = Memory.do_alloc(found_block, size); // Free list now starts a new first free block
            }
            else {
                let found_block = prev_block[FL_NEXT];
                let prev_block[FL_NEXT] = Memory.do_alloc(found_block, size);
            }
        }
        return found_block+1;
    }
    ....
}
```

檔案: String.jack

```
class String {
  constructor String new(int maxLength)
  method void dispose()
  method int length()
  method char charAt(int j)
  method void setCharAt(int j, char c)
  method String appendChar(char c)
  method void eraseLastChar()
  method int intValue()
  method void setInt(int j)
  function char backSpace()
  function char doubleQuote()
  function char newLine()
}
```

檔案: Screen.jack

```
class Screen {
    static Array screen;
    static boolean cur_colour;
    static int white_pixel;
    static int black_pixel;
    static boolean white;
    static boolean black;
    
    /** Initializes the Screen. */
    function void init() {
        let screen = 16384;
        let white = false;
        let black = true;
        let white_pixel = 0;
        let black_pixel = 1;
        let cur_colour = black;
        return;
    }


    /** Erases the whole screen. */
    function void clearScreen() {
        var int i;
        let i = 0;
        while( i < 8192 ) {
            let screen[i] = white;
        }
        return;
    }

    /** Sets the color to be used in further draw commands
     *  where white = false, black = true. */
    function void setColor(boolean b) {
        let cur_colour = b;
        return;
    }

  function void clearScreen()
  function void setColor(boolean b)
  function void drawPixel(int x, int y)
  function void drawLine(int x1, int y1, int x2, int y2)
  function void drawRectangle(int x1, int y1,int x2, int y2)
  function void drawCircle(int x, int y, int r)
}
```

檔案: Output.jack

```
class Output {
    /** Initializes the screen and locates the cursor at the screen's top-left. */
    function void init() {
        let screen = 16384;
        let cursor_x = 0;
        let cursor_y = 0;
        let charMasks = Array.new(2);
        let charMasks[0] = 255;
        let charMasks[1] = -1 & 255;
        do Output.initMap();
        return;
    }

    // Initalizes the character map array
    function void initMap() {
        var int i;
    
        let charMaps = Array.new(127);
        
        // black square (used for non printable characters)
        do Output.create(0,63,63,63,63,63,63,63,63,63,0,0);

        // Assigns the bitmap for each character in the charachter set.
        do Output.create(32,0,0,0,0,0,0,0,0,0,0,0);          //
        do Output.create(33,12,30,30,30,12,12,0,12,12,0,0);  // !
        do Output.create(34,54,54,20,0,0,0,0,0,0,0,0);       // "
        do Output.create(35,0,18,18,63,18,18,63,18,18,0,0);  // #
...
  function void moveCursor(int i, int j)
  function void printChar(char c)
  function void printString(String s)
  function void printInt(int i)
  function void println()
  function void backSpace()
}
```

檔案: Keyboard.jack

```
class Keyboard {
    static Array keyboard;
    
    /** Initializes the keyboard. */
    function void init() {
        let keyboard = 24576;
        return;
    } 
    /**								
     * Reads the next character from the keyboard.
     * waits until a key is pressed and then released, then echoes
     * the key to the screen, and returns the value of the pressed key.
     */
    function char readChar() {
        var char key;
        while( Keyboard.keyPressed() = 0 ) {}
        let key = Keyboard.keyPressed();
        while( ~(Keyboard.keyPressed() = 0) ) {}
        do Output.printChar(key);
        return key;
    }

  function char keyPressed()
  function String readLine(String message)
  function int readInt(String message)
}
```

檔案: Math.jack

```
class Math {
  function void init()
  function int abs(int x)
  function int multiply(int x, int y)
  function int divide(int x, int y)
  function int min(int x, int y)
  function int max(int x, int y)
  function int sqrt(int x)
}
```

檔案: Sys.jack

```
class Sys {

    /** Performs all the initializations required by the OS. */
    function void init() {
        do Math.init();
        do Output.init();
        do Screen.init();
        do Keyboard.init();
        do Memory.init();
        do Main.main();
        do Sys.halt();
        return;
    }

    /** Halts execution. */
    function void halt() {
        while(true){}
        return;
    }
  function void error(int errorCode)
  function void wait(int duration)
}
```

一旦完成這些作業之後，您就從頭到尾實作出了一台完整的電腦。

現在，在您的腦海中，整台電腦應該是鉅細靡遺，一覽無遺的了。

您有沒有發現，電腦對您而言，開始變得很透明呢？



