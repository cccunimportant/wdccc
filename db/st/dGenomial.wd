## 幾何分布 (Geometric distribution)

$P(X=x) = (1-p)^{x-1} p = q^{x-1} p$

範圍：r=1,2,3,.... ; x= r, r+1, r+2, ....

意義：第一次成功所需要的試驗次數。

R 函數： geom(prob) ; p:prob:成功機率, x-1:size:失敗次數, q:失敗機率

* R 的公式：$p(x) = p (1-p)^x$
* R 當中的 x 代表失敗次數，而非第一次成功的次數，因此 R 當中的 x 相當於上式中的 (x-1)
* <http://stat.ethz.ch/R-manual/R-patched/library/stats/html/Geometric.html>

特性：

1. $E[X] =  1/p$
2. $Var(X) = \frac{(1-p)}{p^2} = \frac{q}{p^2}$

動差生成函數：$m_x(t) = \frac{p e^t}{1-(1-p) e^t}= \frac{p e^t}{1-q e^t}$


### R 程式範例：曲線圖

```R
p=0.7; k=seq(0,10)
plot(k, dgeom(k, p), type='h', main='dgeom(p=0.5)', xlab='k')
```
[]](dgeomPlot.jpg)

### R 程式範例：

```R
qgeom((1:9)/10, prob = .2)
Ni <- rgeom(20, prob = 1/4); table(factor(Ni, 0:max(Ni)))
```

執行結果：

```R
> qgeom((1:9)/10, prob = .2)
[1]  0  0  1  2  3  4  5  7 10
> Ni <- rgeom(20, prob = 1/4); table(factor(Ni, 0:max(Ni)))

 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 
 4  5  3  2  0  3  1  0  0  0  1  0  0  0  0  0  0  1 
> 
```

### 參考
* [Wikipedia:幾何分佈](http://zh.wikipedia.org/wiki/%E5%B9%BE%E4%BD%95%E5%88%86%E4%BD%88)
* [Wikipedia:Geometric_distribution](http://en.wikipedia.org/wiki/Geometric_distribution)

