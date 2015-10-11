## C 語言中的寬字串 -- 包含 Unicode

要在 C 語言中使用 Unicode 字串，假如您用的是 gcc 編譯器或 Linux，您可以使用寬字元 wchar_t 這個形態，以取代 char，然後用對應的函數取代原本的字串函數，以下是常見字串函數的寬字元版對應表。

| 窄字元 | 寬字元 |  說明 |
|--------|--------|-------|
| strlen() | wcslen() | 字串長度 |
| strcat() | wcscat() | 字串連接 |
| strcmp() | wcscmp() | 字串比較 |
| strcoll() | wcscoll() | 字串比較 (不分大小寫) |
| strcpy() | wcscpy() | 字串複製 |
| strchr() | wcschr() | 尋找字元 |
| strstr() | wcswcs() | 尋找字串 |
| strtok() | wcstok() | 字串分割 |
| strcspn() | wcscspn() | 傳回字串中第一個符合字元集的位置 |
| strpbrk() | wcspbrk() | 傳回字串中第一個符合字元集的指標 |
| strxfrm() | wcsxfrm() | 根據區域設定 locale() 轉換字元集 |

簡而言之，就是將原本 strXXX() 函數，轉換成 wcsXXX() 函數，然後照著原本的方法使用，只是對象從 char* 改為 wchar_t * 即可，請看下列範例。

### 程式範例：Unicode 寬字串處理函數

檔案：unicode.c

```CPP
#include <stdio.h>
#include <locale.h>

int main(void)
{
    if (!setlocale(LC_CTYPE, "")) {
    	fprintf(stderr, "Error:Please check LANG, LC_CTYPE, LC_ALL.\n");
    	return 1;
    }
    wchar_t *str1=L"Hi!你好"; // 輸出結果 (範例)
    printf("str1=%ls\n", str1); // str1=Hi!你好
    printf("wcslen(str1)=%d\n", wcslen(str1)); // wcslen(str1)=5
    printf("wcschr(str1,%lc)=%d\n", L'好', wcschr(str1, L'好')); // wcschr(str1,好)=4206648
    printf("wcswcs(str1,%ls)=%d\n", L"你好", wcsstr(str1, L"你好")); // wcswcs(str1,你好)=4206646
    printf("wcsspn(str1,aeiou)=%d\n", wcsspn(str1, L"aeiou")); // wcsspn(str1,aeiou)=0
    printf("wcsspn(str1,EFGH)=%d\n", wcsspn(str1, L"EFGH")); // wcsspn(str1,EFGH)=1
    printf("address(str1)=%p\n", str1); // address(str1)=00403030
    printf("wcssbrk(str1,aeiou)=%p\n", wcspbrk(str1, L"aeiou")); // wcssbrk(str1,aeiou)=00403032
    wchar_t str2[20];
    wcscpy(str2, str1);
    printf("str2=%ls\n", str2); // str2=Hi!你好
    printf("wcscmp(str1,str2)=%d\n", wcscmp(str1, str2)); // wcscmp(str1,str2)=0
    wcscat(str2, L",我是John");
    printf("str2=%ls\n", str2); // str2=Hi!你好,我是John
    return 0;
}}
```


### 執行結果

```
D:\cp>gcc unicode.c -o unicode

D:\cp>unicode
str1=Hi!你好
wcslen(str1)=5
wcschr(str1,好)=4206648
wcswcs(str1,你好)=4206646
wcsspn(str1,aeiou)=0
wcsspn(str1,EFGH)=1
address(str1)=00403030
wcssbrk(str1,aeiou)=00403032
str2=Hi!你好
wcscmp(str1,str2)=0
str2=Hi!你好,我是John
```


### 後記

寬字串的處理函數有很多，並不限於上列的函數，幾乎所有具有字串的標準 C 函數都有寬版，關於更多的寬版函數請參考下列網頁。

> <http://www.java2s.com/Tutorial/C/0300__Wide-Character-String/WideCharacterFunctions.htm>

### 參考文獻
* 简明手册:使你的C/C++代码支持Unicode -- http://www.i18nguy.com/unicode/c-unicode.zh-CN.html
* Programming with wide characters By Leslie P. Polzer on February 11, 2006 (8:00:00 AM) -- http://www.linux.com/archive/feature/51836
* [http://www.open-std.org/JTC1/SC22/WG14/www/docs/n1256.pdf The current Standard (C99 with Technical corrigenda TC1, TC2, and TC3 included) (PDF)], (3.61 MB). Pages 397, 398 and 400.