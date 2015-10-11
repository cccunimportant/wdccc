# Visual Studio Code

## 簡介

Visual Studio Code 是微軟 2015 年釋出的程式編輯器，支援 node.js 且有 Intellisense 。

我試用了，覺得不錯用，重要的是連 javascript 都有 intellsense, 這是我用 Notepad++ 和 sublime 好像都沒有的....

下載點： <https://code.visualstudio.com/>

## 用法

要開專案，然後在有小虫線的未知字上按下去，選 add /// reference to node/node.d.ts 才會有 node.js 的 intellisense

安裝完成後，使用 File/Open Folder 開啟專案資料夾，然後在一些有 node.js 關鍵字或函數，有紅色小蟲號的符號底下按下去，然後選 add /// reference to node/node.d.ts 才會有 node.js 的 intellisense。

```
  this.body = fs.createReadStream(__dirname+this.path);
```

用法請參考下列文章。

* <https://code.visualstudio.com/Docs/nodejs>

