## Nand2Tetris -- 教您設計整台電腦的一門課

在上個月的『少年科技人雜誌』當中，我紀錄了自己修習 nand2tetris 這門 Coursera 網站上 MOOC 課程的過程，並且試圖將一台電腦從下到上設計所需要的基本知識講述清楚。

但是、由於 nand2tetris 網站上的 [下列聲明](http://nand2tetris.org/terms.php) ，我決定不把自己的作業程式碼刊登出來。

```
Code Posting Policy
We developed this course and made all its materials freely available because we want to help people learn applied computer science on their own terms. We believe that students and self-learners who set out to do the hardware and software projects should have the benefit and challenge of doing original work, without seeing published solutions. 

Therefore, we request that you don't post solutions publicly on the web, e.g. in blogs or forums. If your course instructor or organizer creates a private space in which work can be shared outside the public domain, that's fine. Likewise, you can share your work with others using a password-protected space, if it's permitted by the specific course in which you are enrolled. 

Please use your judgment and help ensure that many more students, like you, will not be denied the thrill of original work and self-discovery. 

Thx � Noam Nisan and Shimon Schocken
```

雖然如此，不過網路上已經有不少 nand2tetris 作業的程式碼，您只要 [在 google 中打入　nand2tetris github](https://www.google.com.tw/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=nand2tetris+github) 就可以找到這些作業了。

但是，對於程式人而言，有文章卻沒有程式可以對照閱讀，畢竟是個遺憾！

有鑑於此，我決定將自己在  nand2tetris 的作業改寫，從  nand2tetris 自製的硬體描述語言 HackHDL 改寫為 Verilog ，這樣不僅沒有公佈作業答案，也順便讓大家能夠瞭解如何用真正的硬體描述語言來設計處理器與整台電腦的方法，因此我們決定在本期當中用 Verilog 版的 nand2tetris 來說明電腦硬體的設計原理。

希望這樣的作法會對想要瞭解電腦硬體設計的程式人會有所幫助！

現在，就讓我們展開這趟旅程吧！



