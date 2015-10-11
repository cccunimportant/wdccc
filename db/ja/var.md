# 變數與型態

 範例：基本型態

```java
class Var1 {
    public static void main(String args[]) {
    	int x = 3;
    	double y = 5.9;
    	char c = 'a';
    	String s = "def";
    	
    	System.out.println("x="+x);
    	System.out.println("y="+y);
    	System.out.println("c="+c);
    	System.out.println("s="+s);
    }
}
```

 範例：加減乘除

```java
public class Hello {
    /**
     * @param args
     */
    public static void main(String[] args) {
    	// TODO Auto-generated method stub
    	System.out.println("Hello World!");
    	
    	int x=3, y=5;
    	int z = x+y, w=x*y;
    	System.out.println("x="+x+" y="+y+" "+" z="+z+" w="+w);
    	
    	float pi = 3.14f;
    	double e = 2.71828;
    	System.out.println("pi="+pi+" e="+e+" pi/e="+(pi/e));
    	
    	// char *s = "Hello!";
    	String s = "Hello!";
    	char a='a';
    	
    	System.out.println(s+a+pi);
    	
    	
    }

}

```
