---
title: 'Mitigating the Participation Bias by Balancing Extreme Ratings'
collection: publications
permalink: /publication/rating_aggregation_www25
excerpt: 'This paper designs a robust aggregator for ratings with participation bias.'
date: 2025-2-6
venue: 'the ACM Web Conference 2025 (WWW)'
paperurl: 'coming soon'
citation: 'coming soon'
---
### Authors

**Yongkang Guo\***, Yuqing Kong\*, Jialiang Liu\*

### Abstract

  Rating aggregation plays a crucial role in various fields, such as product recommendations, hotel rankings, and teaching evaluations. However, traditional averaging methods can be affected by participation bias, where some raters do not participate in the rating process, leading to potential distortions. In this paper, we consider a robust rating aggregation task under the participation bias. We assume that raters may not reveal their ratings with a certain probability depending on their individual ratings, resulting in partially observed samples. Our goal is to minimize the expected squared loss between the aggregated ratings and the average of all underlying ratings (possibly unobserved) in the worst-case scenario.

  We focus on two settings based on whether the sample size (i.e. the number of raters) is known. In the first setting, where the sample size is known, we propose an aggregator, named as the Balanced Extremes Aggregator. It estimates unrevealed ratings with a balanced combination of extreme ratings. When the sample size is unknown, we derive another aggregator, the Polarizing-Averaging Aggregator, which becomes optimal as the sample size grows to infinity. Numerical results demonstrate the superiority of our proposed aggregators in mitigating participation bias, compared to simple averaging and the spectral method. Furthermore, we validate the effectiveness of our aggregators on a real-world dataset.

### Materials

[[Arxiv]](https://arxiv.org/abs/2502.03737)

