## Nand2Tetris 第 9-11 週 -- 編譯器

本文程式修改自下列 github 網址，使用時請注意遵守開源授權。

* <https://github.com/havivha/Nand2Tetris/tree/master/10>
* <https://github.com/havivha/Nand2Tetris/tree/master/11>

關於 nand2tetris 第 9-11 週的內容與解說，請參考下列文章。

* [少年科技人雜誌 / 2015年8月號 / Nand2Tetris 第 9 週 -- High-Level Language](http://ccc.nqu.edu.tw/db/ymag201508/focus4.html)
* [少年科技人雜誌 / 2015年8月號 /Nand2Tetris 第 10 週 -- Compiler I: Syntax Analysis](http://ccc.nqu.edu.tw/db/ymag201508/focus5.html)
* [少年科技人雜誌 / 2015年8月號 / Nand2Tetris 第 11 週 -- Compiler II: Code Generation](http://ccc.nqu.edu.tw/db/ymag201508/focus6.html)

在本文中，我們主要補充的是實作的方法。我們採用 JavaScript 撰寫，並用 node.js 環境進行測試。

我們的編譯器主要分成兩個部分，詞彙切分 (Lexer) 和語法剖析 (Parser) ，然後當語法剖析完成後，我們在 Parser 當中插入產生中間碼的程式，將 Parser 擴充為一個編譯器 Compiler 。

為了避免公布解答，我們在此僅列出部分程式碼以供參考!

### 詞彙切分 (Lexer)

```javascript
var lexer = {
  tokens : [],
  tokenIdx : 0
}

lexer.scanFile=function(path) {
  // 讀取 *.jack 程式檔，並且切分成一個一個的詞彙放入 tokens 陣列中。
  ...
  var text = fs.readFileSync(path, "utf8");
  ...
  // 接著用一個 regular expression 就能進行詞彙切分的動作。
  var re = /\/\*([\s\S]*?)\*\/|\/\/([^\r\n]*)[\r\n]|"(.*?)"|(\d+)|([a-zA-Z]\w*)|([>=<!\+\-\*\/&%|\.\(\)\{\}\[\];,])|(\s+)|(.)/gm;
  var types = [ "", "comment", "comment", "stringConstant", "integerConstant", "identifier", "symbol", "space", "ch" ];
  ...
  tokens = [];
  tokenIdx = 0;
  ...
  while((m = re.exec(text)) !== null) {
    ...
  }
  return tokens;
}
...
```

### 語法剖析 (Parser) 

```javascript
var compileFile=function(path) {
  ...
  tokens = lexer.scanFile(path);
  ...
  Class();
  ...
}

// class : 'class' VarName '{' classVarDec* subroutineDec* '}'
var Class=function() {
  pushNT("class");
  next("class");
  varKind = "class";
  className = VarName();
  classStaticList=[]; classFieldList=[]; classSubroutineList=[]; classSymTable={};
  next("{");
  while (isNext("static") || isNext("field")) {
    ClassVarDec();
  }
  while (!isNext('}')) {
    SubroutineDec();
  }
  popNT("class");
  console.log("classStaticList=%j", classStaticList);
  console.log("classFieldList=%j", classFieldList);
  console.log("classSubroutineList=%j", classSubroutineList);
}

// classVarDec: {'static'|'field'} type varList ';' 
var ClassVarDec=function() {
  pushNT("classVarDec");
  varKind = next(); // {'static'|'field'}
  Type();
  VarList();
  next(";");
  popNT("classVarDec");
}

// varList: varName (',' varName)*
var VarList=function() {
  var list = [];
  var name=VarName();
  while (isNext(",")) {
    next(",");
    name = VarName();
  }
}

// subroutineDec: ('constructor'|'function'|'method') ('void'|type) varName '(' parameterList? ')' subroutineBody
var SubroutineDec=function() {
  pushNT("subroutineDec");
  ...
  var tag = next(/(constructor)|(function)|(method)/); // ('constructor'|'function'|'method')
  if (isType() || isNext("void")) {
    var vtype = next();
    ...
    next("(");
    if (!isNext(")")) {
      ParameterList();
    }
    next(")");
    SubroutineBody();
  }
  popNT("subroutineDec");
}

// parameterList: (parameter (',' parameter)*)?
var ParameterList=function() {
  pushNT("parameterList");
  Parameter();
  while (isNext(",")) {
    next(",");
    Parameter();
  }
  popNT("parameterList");
}

...

// subroutineBody: '{' varDec* statements '}'
var SubroutineBody=function() {
  pushNT("subroutineBody");
  next("{");
  while (isNext("var")) {
    VarDec();
  }
  Statements(); 
  next("}");
  popNT("subroutineBody");
}

// varDec: 'var' type varList ';'
var VarDec=function() {
  pushNT("varDec");
  next("var");
  varKind = "var";
  Type();
  VarList();
  next(";");
  popNT("varDec");
}

// statements : statement*
var Statements=function() {
  pushNT("statements");
  while (!isNext("}")) {
    Statement();
  }
  popNT("statements");
}

// statement: letStatement | ifStatement | whileStatement | doStatement | returnStatement
var Statement=function() {
  if (isNext("let")) {
    LetStatement();
  } else if (isNext("if")) {
    IfStatement();
  } else if (isNext("while")) {
    WhileStatement();
  } else if (isNext("do")) {
    DoStatement();
  } else if (isNext("return")) {
    ReturnStatement();
  } else {
    error("STATEMENT=>");
  }
}

// letStatement: 'let' varName ( arraySubscript )? '=' expression ';'
var LetStatement=function() {
  pushNT("letStatement");
  next("let");
  ...
  VarName();
  if (isNext("[")) {
    ArraySubscript();
  }
  next("=");
  Expression();
  next(";");
  popNT("letStatement");
}

// arraySubscript: '[' expression ']'
var ArraySubscript=function() {
  next("[");
  Expression();
  next("]");
}

// block = '{' statements '}'
var Block=function() {
  next("{");
  Statements();
  next("}");
}

// ifStatement : 'if' '(' expression ')' block '('else' block)?
var IfStatement=function() {
  pushNT("ifStatement");
  next("if");
  next("(");
  Expression();
  next(")");
  Block();
  if (isNext("else")) {
    next("else");
    Block();
  }
  popNT("ifStatement");
}

// whileStatement: 'while' '(' expression ')' block
var WhileStatement=function() {
  pushNT("whileStatement");
  next("while");
  next("(");
  Expression();
  next(")");
  Block();
  popNT("whileStatement");  
}

// doStatement: 'do' call ';'
var DoStatement=function() {
  pushNT("doStatement");
  next("do");
  Call();
  next(";");
  popNT("doStatement");
}

// returnStatement: 'return' expression? ';'
var ReturnStatement=function() {
  pushNT("returnStatement");
  next("return");
  if (!isNext(";"))
    Expression();
  next(";")
  popNT("returnStatement");
}

// expression: term (op term)* 
var Expression=function() {
  pushNT("expression");
  Term();
  while (isNext(/[\+\-\*\/\&<>=]/)) { // op in "+/-*&<>="
    var op = next();
    Term();
  }
  popNT("expression");
}

...

// call: subroutineName '(' expressionList ')' | (className | varName) '.' subroutineName '(' expressionList ')'
var Call=function() {
  var name = nextType(ID);
  if (isNext("(")) {
    next("(");
    ExpressionList();
    next(")");
  } else if (isNext(".")) {
    next(".");
    var subName = nextType(ID);
    next("(")
    ExpressionList();
    next(")");
  }
}

// expressionList: (expression (',' expression)*)?
var ExpressionList=function() {
  pushNT("expressionList");
  Expression();
  while (isNext(",")) {
    next(",");
    Expression();
  }
  popNT("expressionList");
}
```

### 中間碼產生 (Code Generation) 

產生中間碼的動作直接嵌入在語法剖析動作中執行，例如以下的程式碼中，有 gen.command(...) 之類的動作就是用來產生中間碼的。

```javascript
// subroutineBody: '{' varDec* statements '}'
var SubroutineBody=function() {
  pushNT("subroutineBody");
  next("{");
  varCount = 0;
  while (isNext("var")) {
    VarDec();
  }
  gen.method(methodTag, className+"."+methodName, varCount);
  if (methodTag === "method") { // method 函數預設第一個參數為 this
    gen.command('push argument 0');
    gen.command('pop pointer '+POINTER_THIS); // set up 'this' pointer
  } else if (methodTag === "constructor") {
    genPush(classFieldList.length);
    gen.command('call Memory.alloc 1');
    gen.command('pop pointer '+POINTER_THIS); // set up 'this' pointer
  }
  Statements(); 
  next("}");
  popNT("subroutineBody");
}

// varName: ID
var VarName=function() {
  var name=nextType(ID);
  if (varKind == "let") return name;
  var symbol = { name:name, type:varType, kind:varKind };
  switch (varKind) {
    case "class": break;
    case "static": addSymbol(classSymTable, classStaticList, symbol); break;
    case "field": symbol.kind="this"; addSymbol(classSymTable, classFieldList, symbol); break;
    case "subroutine":addSymbol(classSymTable, classSubroutineList, symbol); break;
    case "argument": addSymbol(methodSymTable, methodArgList, symbol); break;
    case "var": symbol.kind="local"; addSymbol(methodSymTable, methodVarList, symbol); break;
    default:
      error("VarKind not Found!");
  }
  return name;
}

// arraySubscript: '[' expression ']'
var ArraySubscript=function(arrayName) {
  genPush(arrayName);
  next("[");
  Expression();
  next("]");
  gen.command("add");
  gen.command("pop pointer "+POINTER_THAT); // pop into that ptr
  gen.command("push that 0"); //  push *(base+index) onto stack
}

// condExpression = ( expression ) block
var CondExpression=function(gotoLabel) {
  next("(");
  Expression();
  next(")");
  gen.command("not"); // ~(cond)
  var notifLabel = newLabel();
  gen.command("if-goto "+notifLabel);
  Block();
  gen.command("goto "+gotoLabel);
  gen.label(notifLabel);
}
```

而 gen 這個用來輸出中間碼的物件，其部分程式碼如下：

```
gen.stringConstant=function(str) {
  command('push constant '+str.length);
  gen.call("String.new", 1);
  for (var i=0; i<str.length; i++) {
    command('push constant '+str.charCodeAt(i));
    gen.call("String.appendChar", 2);
  }
}

gen.keywordConstant=function(str) {
  switch (str) {
    case "this" : gen.command("push pointer 0"); break;
    case "true" : gen.command("push constant 1"); gen.command("neg"); break;
    case "false": gen.command("push constant 0"); break;
    case "null" : gen.command("push constant 0"); break;
    default: throw Error("keywordConstant not found :"+str);
  }
}

gen.command = function(cmd) {
  command(cmd);
}
```

以上用程式碼片段說明了我們的編譯器實作方法，您可以看到這個編譯器的設計方式採用的是遞迴下降法，也就是直接用遞迴程式剖析 EBNF 語法的方式，來處理 JACK 這個程式語言的語法。


