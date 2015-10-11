# 機率分布 (連續型)

## 簡介

| 連續機率模型 | 密度函數 | R 函數 | 說明 |
|--------------|----------|--------|------|
| 常態分布(Normal) | $\frac{1}{\sqrt{2\pi} \sigma} e^{- \frac{1}{2} [(x-\mu)/\sigma]^2}$ | norm(mean, sd) | 中央極限定理：x1+x2+...+xk; 當 k 越大就越接近常態分布 | 
| 伽瑪分布 (Gamma) | $\frac{1}{\Gamma(a) b^{a}} x^{a-1} e^{-x/b}$ | gamma(shape, rate = 1, scale = 1/rate) |  $\Gamma(k) = \int_{0}^{\infty} z^{k-1} e^{-z} dz$ <br/>  指數分布與卡方分布都是 Gamma 分布的特例 |
| 指數分布	(Exponential)| $\frac{1}{b} e^{-x/b}$ | exp(rate) | 伽瑪分布($a=1, b=\frac{1}{\lambda}$) <br/> 布瓦松過程中，第一次事件出現的時間 W |
| 卡方分布 (Chi-Square) |  $\frac{1}{2^{\gamma/2}\Gamma(\gamma/2)}\,x^{\gamma/2 - 1} e^{-x/2}$ | chisq(df, ncp) | 伽瑪分布( $b=2, a=\gamma/2$ ) <br/> 利用樣本推斷母體變異數 | 
| 均勻分布 (Uniform) | $\frac{1}{b-a}$ | unif(a:min, b:max) | a:範圍下限, b: 上限 <br/> 出現機會均等 |
| 柯西分布 (Cauchy) | $\frac{1}{\pi} \frac{a}{a^2 + (x-b)^2}$ | cauchy(b:location, a:scale)  | |
| 威布爾分布 (Weibull)| $a b x^{b-1} e^{-a x^{b}}$ | weibull(a:shape, b:scale) | $\rho(t)=\frac{f(t)}{R(t)}$ <br/> 可靠度工程：f(x) 失敗時間, R(t) 可靠度,$\rho(t)$ 失敗率 |
| T 分布 (T)	| $\frac{Z}{\sqrt{X_{\gamma}^2/\gamma}}$ | t(df, ncp) | 估計變異數時使用的分布 | 
| F 分布 (F)	| $\frac{X_{\gamma_1}^2 / \gamma_1}{X_{\gamma_2}^2/\gamma_2}$ |  f(df1, df2, ncp) | 等變異數 F 檢定時使用 | 
| 貝塔分布 (Beta) | $f(x)= \frac{Γ(a+b)}{Γ(a) Γ(b)} x^{a-1}(1-x)^{b-1}$  | beta(a:shape1, b:shape2, ncp) |  | 
| 對數常態分布	 (Log Normal) | |  lnorm(meanlog, sdlog) | | 
| 邏輯分布	| | logis(location, scale)	| |
| Signrank	| | signrank(n)	| |
| 威爾斯	| | wilcox(m, n) | a,b 為兩組樣本 | 

## T 分布

