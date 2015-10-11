## 多項分布 (Multinomial Distribution)

$\frac{n!}{x_1!...x_k!}  p_1^{x_1} p_2^{x_2}...p_k^{x_k}$

* 意義：n 次試驗中各種情況分別出現 x1, x2, ..., xk 次的機率 
* 範圍：x1, x2, ..., xk=0,1,2,...,n ; 0<p[i]<1
* R 函數：multinom(size, prob) ; n:size:樣本數, p:prob:各種情況的機率
    * http://stat.ethz.ch/R-manual/R-patched/library/stats/html/Multinom.html

### R 函數範例

```R
rmultinom(10, size = 12, prob=c(0.1,0.2,0.8))

pr <- c(1,3,6,10) # normalization not necessary for generation
rmultinom(10, 20, prob = pr)

## all possible outcomes of Multinom(N = 3, K = 3)
X <- t(as.matrix(expand.grid(0:3, 0:3))); X <- X[, colSums(X) <= 3]
X <- rbind(X, 3:3 - colSums(X)); dimnames(X) <- list(letters[1:3], NULL)
X
round(apply(X, 2, function(x) dmultinom(x, prob = c(1,2,5))), 3)
```

執行結果：

```
> rmultinom(10, size = 12, prob=c(0.1,0.2,0.8))
     [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10]
[1,]    1    1    1    0    2    0    1    1    0     2
[2,]    1    2    3    0    3    0    2    1    1     2
[3,]   10    9    8   12    7   12    9   10   11     8
> 
> pr <- c(1,3,6,10) # normalization not necessary for generation
> rmultinom(10, 20, prob = pr)
     [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10]
[1,]    1    1    2    2    1    1    2    1    1     2
[2,]    2    2    2    2    6    7    3    5    4     4
[3,]    9    4    8    4    8    8    4    7    3     6
[4,]    8   13    8   12    5    4   11    7   12     8
> 
> ## all possible outcomes of Multinom(N = 3, K = 3)
> X <- t(as.matrix(expand.grid(0:3, 0:3))); X <- X[, colSums(X) <= 3]
> X <- rbind(X, 3:3 - colSums(X)); dimnames(X) <- list(letters[1:3], NULL)
> X
  [,1] [,2] [,3] [,4] [,5] [,6] [,7] [,8] [,9] [,10]
a    0    1    2    3    0    1    2    0    1     0
b    0    0    0    0    1    1    1    2    2     3
c    3    2    1    0    2    1    0    1    0     0
> round(apply(X, 2, function(x) dmultinom(x, prob = c(1,2,5))), 3)
 [1] 0.244 0.146 0.029 0.002 0.293 0.117 0.012 0.117 0.023 0.016
> 
```
