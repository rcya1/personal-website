---
title: Roots of Unity Filter Part 4 - Proof
date: '2025-07-28'
category: Math
excerpt: The final part of a four part series about roots of unity filter. We go over the proof of the roots of unity filter, showing that it works with any cycle length or offset.
---

## Note

I originally wrote a three part series back in 2019 that covered the roots of unity filter, a technique that I used a couple times during my stint with competitive math. However, I never really had a proof for why the roots of unity filter worked and I instead just had empirical evidence that it would work for all cycle lengths between $2$ and $10$ and all of their offsets. This was enough for me to use it in my competitive math career, but I always felt uneasy that I left such a big hole on my website that was saying "just trust me." Six years later and after graduating both high school and college, I'm finally revisiting this to provide a proof <span>😅</span>. It isn't necessarily that difficult or insightful, but it feels wrong to leave something up for so long that was unproven.

## Recap

As a reminder, the roots of unity filter says that given a polynomial of degree $n$:

$$
P(x) = a_0 + a_1x + a_2x^2 + \dots + x^{n-1}
$$

a period length $m$, and an offset $b$, we have:

$$
\sum_{i = 0; mi + b < n} a_{mi + b} = \frac{\sum_{j=0}^{m-1} b_j P(\omega^j)}{m}
$$

where $\omega$ is the $m$th root of unity and the coefficients $b_j$ are:

$$
b_j = \omega^{- (bj \% m)}
$$

For our proof, we will multiply both sides of our expression by $m$ to get:

$$
m \cdot \sum_{i = 0; mi + b < n} a_{mi + b} = \sum_{j=0}^{m-1} b_j P(\omega^j)
$$

## Handling $b = 0$

We first handle the simpler case where there is no offset, or $b = 0$. In reality, we could provide a general proof that does not handle this separately, but I think the $b = 0$ case is easier to digest and parts of it are used in the general case.

In this case, we have $b_j = \omega^m = 1$ for all $j$. As a result, our RHS sum becomes just $P(1) + P(\omega) + \dots + P(\omega^{m-1})$. Our LHS is the sum of all coefficients $a_{mi}$ for all $i$ multiplied by $m$.

We focus on the coefficient of $a_{mi}$ for any $i > 0$. On the LHS, this is $m$. We do the same for the RHS for each of the terms $P(\omega^j)$. The term of note is $a_{mi} \omega^{mij}$. Since $\omega^m = 1$, we have this term is just $a_{mi}$, showing the coefficient is $1$ for each of the $m$ different terms. Therefore, the total coefficient of $a_{mi}$ is $m$ on the RHS, matching the LHS.

We then look at the coefficient of any other term $a_{mi + x}$ for any $i > 0$ and $0 < x < m$. Here, we have the LHS side coefficient is $0$. For each of the RHS terms $P(\omega^j)$, the term of note is $a_{mi + x} \omega^{(mi + x)j}$. Focusing on this $\omega$ term, we get:
$$\omega^{mij} \cdot \omega^{xj} = \omega^{xj}$$

Therefore, our RHS coefficient for $a_{mi + x}$ is given as:

$$
\sum_{j=0}^{m-1} \omega^{xj}
$$

We apply the geometric sum formula, which is applicable since $\omega \neq 1$:

$$
\sum_{j=0}^{m-1} \omega^{xj} = \frac{1 - (\omega^b)^m}{1 - \omega^x} = \frac{1 - 1}{1 - \omega^x} = 0
$$

As a result, our RHS coefficient for $a_{mi + x}$ is $0$. This covers all possible terms, proving the $b = 0$ case for the roots of unity filter.

## Handling $b > 0$

We use the same proof structure, except in this case, we no longer have $b_j = 1$ and instead will get some power of $\omega$. We first focus on the coefficient of $a_{mi + b}$, which is $m$ on the LHS. For the RHS, we note that the term of note in each $P(\omega^j)$ is:

$$
a_{mi + b} \cdot \omega^{(mi + b)j} \cdot \omega^{- (bj \% m)} = a_{mi + b} \cdot \omega^{bj - (bj \% m)}
$$

Note that the exponent of $\omega$ must be divisible by $m$, meaning the coefficient evaluates to just $1$ for each of the $m$ terms, leading to a total contribution of $m$.

Next, we focus on the coefficient of $a\_{mi + b + x}$ for any $i > 0$ and $0 < x < m$. This has a LHS coefficient of $0$, and the RHS coefficient is given as:

$$
\sum_{j=0}^{m-1} \omega^{(mi + b + x)j} \cdot \omega^{- (bj \% m)}
$$

We can simplify this to:

$$
\sum_{j=0}^{m-1} \omega^{bj - (bj \% m) + xj}
$$

Applying the insight from the $a_{mi + b}$ case, we have $\omega^{bj - (bj \% m)}$ is just $1$, and we are left with:

$$
\sum_{j=0}^{m-1} \omega^{xj}
$$

This is the exact same expression as in the $b = 0$ case, where we showed this evaluates to $0$, thus proving the general case.
