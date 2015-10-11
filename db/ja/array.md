# 陣列

範例：一維陣列

```java
class Array1 {
  public static void main(String[] args) throws Exception {
    String[] names={"大毛","二毛","小毛"};
    String[] tels={"082-31333","082-31111","082-31222"};
    for (int i=0; i<names.length; i++)
      System.out.println(names[i]+" "+tels[i]);
  }
}
```

範例：循序搜尋

```java
class People3
{ 
  public static void main(String[] args)
  {
    String target = "二毛";
    if (args.length > 0) target = args[0];
    String[] name={"大毛","二毛","小毛" };
    String[] tel={"31333","31111","31222"};
    for (int i=0; i<3; i++)
    {
      if (target.equals("") || name[i].equals(target))
        System.out.println(name[i]+ ":"+tel[i]);
    }
  }
}
```

向量與內積

```java
public class Vector {
      public static void main(String[] args) {
    	  double x[] = {1.0, 2.0, 3.0};
    	  double y[] = {4.0, 5.0, 6.0};
    	  print(x);
    	  print(y);
    	  double z[] = new double[x.length];
    	  add(x, y, z);
    	  print(z);
    	  
    	  double xy = dot(x, y);
    	  System.out.println("x*y="+xy);
      }
      
      public static void print(double a[]) {
    	  for (int i=0; i<a.length; i++)
    	  System.out.print(a[i]+" ");
    	  System.out.println();
      }

      public static void add(double a[], double b[], double c[]) {
    	  for (int i=0; i<a.length; i++)
    	  c[i] = a[i] + b[i];
      }
      
      public static double dot(double a[], double b[]) {
    	  double result = 0.0;
    	  for (int i=0; i<a.length; i++)
    	  result += a[i]*b[i];
    	  return result;
      }
}

```

範例：二維陣列列印

```java
class Array2 {
  public static void main(String[] args)
  {
    int a[][] = {{1,2}, {3,4}};
    System.out.println("=======a=======");
    for (int i=0; i<a.length; i++)
    {
      for (int j=0; j<a[i].length; j++)
        System.out.print(a[i][j]+" ");
      System.out.println();
    }
  }
}
```


範例：二維陣列加總

```java
class Array3 
{
    public static void main(String[] args) 
    {
    	int a[][] = {{1,2,3}, {4,5,6}};
    	int sum = 0;
    	for (int i=0; i<a.length; i++)
    	{
    	for (int j=0; j<a[i].length; j++)
    	  sum += a[i][j];
    	}
    	System.out.println("sum(a) = "+sum);
    }
}
```


範例：兩個陣列相加

```java
class Matrix1 {
    public static void main(String[] args) {
    	int A[][] = {{1,2}, {3,4}};
    	int B[][] = {{5,6}, {7,8}};
    	int C[][] = new int[2][2];
    	for (int i=0; i<C.length; i++) {
    	for (int j=0; j<C[0].length; j++) {
    	int sum = 0;
    	for (int k=0; k<2; k++) {
    	sum = sum+A[i][k]*B[k][j];
    	}
    	C[i][j] = sum;
    	}
    	}
    	for (int i=0; i<C.length; i++) {
    	for (int j=0; j<C[0].length; j++) {
    	System.out.print(C[i][j]+" ");
    	}
    	System.out.println();
    	}
    }
}
```


範例：兩陣列相加 (函數版)

```java
class Array2 {
  public static void main(String[] args)
  {
    int x[][] = {{1,2}, {3,4}};
    int y[][] = {{3,4}, {7,8}};
    int z[][] = new int[2][2];
    System.out.println("========= x ==========");
    print(x);
    System.out.println("========= y ==========");
    print(y);
    add(x,y,z);
    System.out.println("========= z ==========");
    print(z);
  }

  public static void add(int a[][], int b[][], int c[][]) {
        for (int i=0; i<a.length; i++)
        {
          for (int j=0; j<a[i].length; j++)
        	  c[i][j] = a[i][j]+b[i][j];
        }
  }
  
  public static void print(int a[][]) {
        for (int i=0; i<a.length; i++)
        {
          for (int j=0; j<a[i].length; j++)
            System.out.print(a[i][j]+"\t");
          System.out.println();
        }
  }
}
```

範例：記憶體電話簿

```java
import java.io.*;
import java.util.*;

public class TelBook 
{
    public static void main(String args[]) throws Exception 
    {
    	BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
    	Vector nameList = new Vector();
    	Vector telList  = new Vector();
    	while (true)
    	{
    	System.out.println("0.結束\n1.新增\n2.列印\n\n");
    	System.out.print("請選擇功能 (0,1,2):");
    	String select = in.readLine();
    	if (select.equals("0"))
    	return;
    	if (select.equals("1"))
    	{
    	System.out.print("姓名:");
    	String name = in.readLine();
    	System.out.print("電話:");
    	String tel  = in.readLine();
    	nameList.add(name);
    	telList.add(tel);
    	}
    	if (select.equals("2"))
    	{
    	System.out.println("=姓名=\t=電話=");
    	for (int i=0; i<nameList.size(); i++)
    	System.out.println(nameList.get(i)+"\t"+telList.get(i));
    	}
    	System.out.println("\n\n");
    	}
    }
}
```

矩陣：有轉置功能

```java
class Matrix {
  public static void main(String[] args) {
    double A[][] = {{1,2}, {3,4}};
    double B[][] = {{5,6}, {7,8}};
    double C[][] = new double[2][2];
    double D[][] = new double[2][2];
    System.out.println("========A========");
    print(A);
    System.out.println("========B========");
    print(B);
    add(A, B, C);
    System.out.println("========C=A+B====");
    print(C);
    dot(A, B, D);
    System.out.println("========D=A*B====");
    print(D);
    System.out.println("========sum======");
    double sum = sum(D);
    System.out.println("sum(D)="+sum);
    not(D);
    System.out.println("========not(D)========");
    print(D);

    double X[][] = {{1,2,3}, {4, 5, 6}};
    
    System.out.println("==========X===========");
    print(X);
    double T[][] = transform(X);
    System.out.println("==========T===========");
    print(T);
    
    
  }
 
  public static void print(double A[][]) 
  {
    for (int i=0; i<A.length; i++) 
    {
      for (int j=0; j<A[0].length; j++) 
         System.out.print(A[i][j]+" ");
      System.out.println();
    }
  }
 
  public static void not(double A[][]) 
  {
    for (int i=0; i<A.length; i++) 
      for (int j=0; j<A[0].length; j++) 
        A[i][j] = -A[i][j];
  }
 
  public static double sum(double A[][]) 
  {
    double total = 0;
    for (int i=0; i<A.length; i++) 
      for (int j=0; j<A[0].length; j++) 
        total += A[i][j];
    return total;
  }
 
  public static void add(double A[][], double B[][], double C[][]) 
  {
    for (int i=0; i<A.length; i++) 
      for (int j=0; j<A[0].length; j++) 
        C[i][j] = A[i][j] + B[i][j];
  }
 
  public static void dot(double A[][], double B[][], double C[][]) 
  {
    for (int i=0; i<C.length; i++) 
      for (int j=0; j<C[0].length; j++) 
      {
        double sum = 0;
        for (int k=0; k<2; k++) 
            sum = sum+A[i][k]*B[k][j];
        C[i][j] = sum;
      }
  }

  public static double[][] transform(double A[][]) 
  {
    double T[][] = new double[A[0].length][A.length];
    for (int i=0; i<T.length; i++) 
      for (int j=0; j<T[0].length; j++) 
        T[i][j] = A[j][i];
    return T;
  }  
}
```

