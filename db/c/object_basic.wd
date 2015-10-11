## 物件導向的基本概念 -- 封裝，繼承，多型

C 語言雖然不是一種物件導向的語言，但是由於具有函數指標 (function pointer) 與結構 (struct)，因此可以讓我們模擬出類似物件導向的語法。在本章中，我們將說明如何用 C 語言設計物件導向的程式。

物件導向語言大致上具有三個主要的特徵 -- 「封裝、繼承與多型」，以下是這三種特徵的基本描述與範例。

封裝：將資料與函數放在一種稱為物件的結構中。

繼承：子物件可以繼承父物件的所有欄位與屬性，並且可以新增欄位或修改函數。

多型：多種不同的子物件繼承同一種上層物件時，我們可以用上層物件容納之，在呼叫時仍然會根據真實物件型態呼叫對應的子物件函數。

### 物件導向的三種基本特徵

封裝：

```java
class Shape {
  double area() { return 0.0; }
}
```

繼承：


```java
class Circle extends Shape {
  public double r;
  Circle(double pr) { r = pr; }
  double area() { return 3.14*r*r; }
}
```

多型：

```java
    Shape s[] = { new Shape(), new Circle(3.0) };
    for (int i=0; i<s.length; i++)
      System.out.println("area()="+s[i].area());
```


### 完整程式範例

```java
class Shape {
  double area() { return 0.0; }
  
  public static void main(String[] argv) {
    Shape s[] = { new Shape(), new Circle(3.0) };
    for (int i=0; i<s.length; i++)
      System.out.println("area()="+s[i].area());
  }
}

class Circle extends Shape {
  public double r;
  Circle(double pr) { r = pr; }
  double area() { return 3.14*r*r; }
}

```


### 執行結果

```
D:\cp>javac Shape.java

D:\cp>java Shape
area()=0.0
area()=28.259999999999998
```

在本文中，我們介紹了如何實作封裝、繼承、多型等三種物件導向的基本特性，在本章的後續小節中，我們將同樣以 Shape 這個範例，說明如何用 C 語言實作出這些物件導向功能。

