---
layout: app
---

<head>
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
            skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
            inlineMath: [['$','$']]
            }
        });
    </script>
</head>

# 浅谈伪随机

很多人都听说过伪随机这个概念，在生活中很多地方都会用到。

然而，这方面相关的中文教材、科普却很少。

本文将根据本人的理解、北京大学密码学课程的讲授、以及其他参考资料为基础，浅谈伪随机这个概念。

## 真随机存在么？

这是一个很好的哲学问题，但不是本文要讨论的问题。

无论真随机是否存在，我们都可以假设他存在。

## 伪随机生成器

所谓伪随机，目的就是让人类乃至电脑区分不了伪随机和真随机的区别。

因此，我们需要首先对区分器进行定义，再基于区分器定义伪随机生成器。

### 区分器Distinguisher

定义函数的集合：

$$\mathcal{A}=\left\{A:\left \{ 0,1 \right \}^n\rightarrow \left \{ 0,1 \right \}^*\right\}$$

集合中的这些函数称之为区分器，用来区分一个长度为n的随机数是否是伪随机数。

通常，这些函数是多项式时间的统计学检验算法。

### 伪随机生成器Pseudorandom generator

定义

$$G:\left \{ 0,1 \right \}^l\rightarrow\left \{ 0,1 \right \}^n,(l<n)$$ 

是对抗区分器$\mathcal{A}$的伪随机数生成器。

令$U_k$是$\begin{Bmatrix}0,1\end{Bmatrix}^k$中的均匀分布，

对于$\mathcal{A}$中的任意函数$A$，$A(G(U_l))$和$A(U_n)$的分布相差都不超过$\epsilon$时，即说明$G$是能对抗区分器集合$\mathcal{A}$的伪随机生成器。

伪随机生成器对于$\mathcal{A}$和$\epsilon$都没有规定，因此更多用于理论分析中。而接下来的PRNG规定了区分器为多项式复杂度的算法，且$\epsilon$为极小(negligible)。

### 伪随机数生成器Pseudorandom number generator

定义

$$G_k:\left \{ 0,1 \right \}^k\rightarrow\left \{ 0,1 \right \}^{p(k)},(\forall k,p(k)>k)$$

是输入长度为$k$的种子并输出长度为$p(k)$的伪随机数生成器。其中$p(k)$是关于k的多项式。

对于任何多项式算法$A$，以$0,1$作为输出，我们有

$$\left|\Pr_{x\leftarrow\left \{ 0,1 \right \}^k}[A(G(x))=1]-\Pr_{x\leftarrow\left \{ 0,1 \right \}^{p(k)}}[A(r)=1]\right|<\mu(k)$$

其中，$\mu(k)$是极小函数，即满足$\mu(k)<\frac{1}{poly(k)}$。$x\leftarrow\begin{Bmatrix}0,1\end{Bmatrix}^k$​表示$x$​是长度为$k$的真随机二进制数。


### 前向安全伪随机数生成器forward-secure PRNG

通常来说，我们在计算机中使用的伪随机数生成器，除了会生成随机数外，还会生成下一轮的随机种子，使得生成器能连续不断地生成新的随机数。

因此，我们定义前向安全伪随机生成器

$$G_k:\left \{ 0,1 \right \}^k\rightarrow\left \{ 0,1 \right \}^k\times \left \{ 0,1 \right \}^{t(k)}$$

可以同时生成下一个随机种子和伪随机数。

通过伪随机数生成器可以很容易构造前向安全伪随机数生成器。

## PRD算法

Pesudo Random Distribution(PRD)算法，常见应用于各大游戏中，用于调节随机带来的方差过大问题，又叫动态概率。

有一个经典案例：

```
PA大招的暴击概率是15%，在不应用PRD算法时，玩家经常能观测到3连爆甚至4连爆的情况，并认为这不正常。

然而，在300次攻击中，出现三连爆的概率其实高达57.9%；

在1000次攻击中，出现三连爆的概率更是高达94.5%，出现四连爆的概率则有35%

事实上，一把游戏下来PA攻击上千次都是很正常的，因此一直不出现三连爆、四连爆反而是奇怪的事情。
```

这个案例说明，人类对于概率的感知是有偏差的。

```
在应用PRD算法之前，PA在1000次攻击中，出现连续31次不暴击的概率高达62.4%。

然而应用PRD算法后不可能发生连续31次不暴击的情况。

对于电脑而言，这是非常显著的区别，但人类却根本察觉不到这一点。
```

这可能是因为人类对于高频信息（如连爆）比较敏感，而对于低频信息（如连续31次攻击至少暴击一次）不太敏感

### PRD算法伪在哪里？

虽然Pesudo Random Distribution中也包含了Pesudo Random这个关键词，但这个Pesudo其实形容的是Distribution。

事实上，PRD算法本身不产生随机数。

PRD算法只调整暴击的概率，但究竟是否暴击，还是要交给随机数生成器或伪随机数生成器来完成。

因此，PRD算法不是随机数生成器，也不是伪随机数生成器，而是一个动态概率调整算法；不能把PRD算法和计算机受限于硬件性能而使用的伪随机混淆了。

通俗地讲，PRD算法只调整骰子每个面的数值，而投骰子的是随机数生成器。

### PRD算法的应用

事实上，很多抽卡游戏都应用了PRD算法

如明日方舟，在50次不出之后，概率就会递增，这就是PRD算法的应用。

再比如原神，在73次不出之后，概率也会递增，这也是PRD算法的应用。

然而，概率的递增和你是否出货又是两码事，PRD算法只调整概率，是否出货由随机数生成器决定。