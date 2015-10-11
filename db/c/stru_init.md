## 結構的初始化 — (Initialization) 直接設定欄位初始值

### 程式範例

```CPP
#include <stdio.h>

typedef struct {
    char *name;
    int age;
} person;

int main() {
    person p = {
      .name = "John",
      .age = 40
    };
    
    printf("%s is %d years old", p.name, p.age);
}
```

### 執行結果

```
D:\cp\code>gcc structInit.c -o structInit

D:\cp\code>structInit
John is 40 years old
```

