# Java 程式設計

## 簡介

Java 在 1995 年出現以來，恰好趕上了 Web 風潮，當時的瀏覽器急需一個好的語言，於是昇陽提出了 Java Applet 作為瀏覽器語言的解決方案。由於時機恰到好處，Java 語言吸引了許多程式設計師的加入，這讓 Java 成為目前使用者最多的程式社群。

但是昇陽在 Java Applet 上遭遇到了其他公司的阻撓 (像是微軟)，更糟的是，昇陽的瀏覽器顯示技術其實相當糟糕，這導致 Java Applet 很難使用，功能也不強大，在 Flash 出現之後，Java Applet 的市場很快就被 Flash 所接收了。

然而，「失之東隅、收之桑榆」，Java Applet 雖然在瀏覽器上幾乎完全失敗，但卻意外的在桌上型電腦與伺服器領域取得領導地位，讓許多公司投入資源到 Java 語言上，導致 Java SE、Java EE 成為許多企業運作的核心程式平台，而 Java 也成為最受企業歡迎的語言。

這個結果讓開放原始碼的Apache 組織、以及商業性的 IBM、Google 等公司，相繼投入 Java 軟體的撰寫製作上。IBM 釋出的 Eclipse 成為開放原始碼程式開發上最受歡迎的環境，而 Google 更是用 Java 作為 Android 手機與 Google Apps Engine 雲端平台的主要語言，這些動作都持續的提升了 Java 語言的地位，讓 Java 繼續在程式設計領域占有重要的地位。

然而，這十五年的發展結果，也讓 Java 語言的缺點顯露無遺，Java 冗長的語法、大而無當的函式庫架構、以及缺乏良好的視覺化介面設計軟體，都讓許多的 Java 程式設計師相當失望。許多人轉而尋求更簡潔語法，以及更好的程式開發工具，於投入到 Python、Ruby、C#、PHP、Scala 等語言的社群中。

即便如此，Java 平台仍然有其優點，昇陽透過 Java 語言的推廣，將 JVM 虛擬機器的概念帶到軟體市場上。因此微軟也推出 .Net 平台以對抗之。IBM 的 Eclipse 讓 Java 具有一個非常良好的開發工具，而 Google 的 Android 平台解決了 Java 沒有良好視覺化介面與視覺化開發工具的問題，Google Apps Engine 雲端平台更讓 Java 成為雲端運算中重要的語言之一。於是，Java 語言再度復興了。

身為一個同時使用 C、Java、C# 與 R 語言的程式設計師，我欣賞 C 語言的強悍、C# 語言的優美、R 語言的簡潔，但也接受 Java 的不完美。在撰寫系統程式或嵌入式程式時，我會採用 C 語言。在撰寫視窗程式與遊戲程式時，我會採用 C# 語言，在做研究時使用 R 語言，但是在撰寫手機程式與雲端程式時，我會採用 Java 語言。這是不得不然的選擇，或許這個程式世界就應該是多元化的，程式設計師不應該受限在任何一個語言上面，廣泛的接受並學習各種語言，似乎已經成為程式設計師必須學習的重要功課。

## 基礎範例

### 範例一：輸出 Hello

```java
class Hello {
  public static void main(String[] args)
  {
    System.out.println("Hello!");
  }
}
```

### 範例二：字串轉數字

```java
public class Type1 {
  public static void main(String[] args)
  {
     int i1 = Integer.parseInt("15");
     double d1 = Double.parseDouble("320.31");
     System.out.println("i1="+i1);
     System.out.println("d1="+d1);
  }
}
```

### 範例三：參數取得

```java
class Args1 {
    public static void main(String args[]) {
    	for (int i=0; i<args.length; i++)
    	System.out.println("args["+i+"]="+args[i]);	
    }
}
```

