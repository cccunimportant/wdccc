## C 語言 -- 使用 Inline 函數

### 程式範例

檔案：inline.c

```CPP
inline int max(a,b) {
  return (a>b?a:b);
}

inline int min(a,b) {
  return (a<b?a:b);
}

int main() {
  int x = max(3,5);
  int y = min(3,5);
  printf("max(3,5)=%d\n", x);
  printf("min(3,5)=%d\n", y);
}
```

### 巨集展開結果

執行 gcc -E inline.c -o inline.i 指令之後，就會得到 inline.i

檔案：inline.i

```CPP
inline int max(a,b) {
  return (a>b?a:b);
}

inline int min(a,b) {
  return (a<b?a:b);
}

int main() {
  int x = max(3,5);
  int y = min(3,5);
  printf("max(3,5)=%d\n", x);
  printf("min(3,5)=%d\n", y);
}
```

