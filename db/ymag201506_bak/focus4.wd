## Nand2Tetris 第二週 -- 布林算術

課程網址： <https://class.coursera.org/nand2tetris1-001/wiki/week_2>

Nand2tetris 課程的 HDL 的語法請參考： [HDL Survival Guide](http://www.nand2tetris.org/software/HDL%20Survival%20Guide.html)


在 HDL 的輸入裏不能使用 0, 1, 但是可以使用 false, true.

注意下列範例，您可以將某些線路分別輸出或輸入

### Sub-busing

Sub-busing can only be used on buses that are named in the IN and OUT statements of an HDL file, or inputs and outputs of the chip-parts used in the PARTS section. If you need a sub-bus of an internal bus, you must create the narrower bus as an output from a chip-part. For example:

```
	CHIP Foo {
	   IN in[16];
	   OUT out;
	PARTS:
	   Something16 (in=in, out=notIn);
	   Or8Way (in=notIn[4..11], out=out);
	}
```

This implementation causes an error on the Or8Way statement. This needs to be coded as:

```
	   Something16 (in=in, out[4..11]=notIn);
	   Or8Way (in=notIn, out=out);
```

Multiple Outputs

Sometimes you need more than one sub-bus connected to the output of a chip-part. Simply add more than one out= connection to the chip-part definition.

```
	CHIP Foo {
	   IN in[16];
	   OUT out[8];
	   PARTS:
	       Not16 (in=in, out[0..7]=low8, out[8..15]=high8);
	       Something8 (a=low8, b=high8, out=out);
	}
```

This also works if you want to use an output of a chip in further computations.

```
	CHIP Foo {
	IN a, b, c;
	OUT out1, out2;
	PARTS:
	   Something (a=a, b=b, out=x, out=out1);
	   Whatever (a=x, b=c, out=out2);
	}
```


### 結語

終於把第二週的功課做完了！

由於對 Nand2tetris 課程的 HDL 的語法不瞭解，還著實吃了一些苦頭，除錯了很久！

雖然如此， Nand2tetris 已經做得很好了，這些時間花得還是很值得！





