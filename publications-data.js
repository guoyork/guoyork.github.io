const publications = [
    {
        title: "Mitigating the Participation Bias by Balancing Extreme Ratings",
        authors: "Yongkang Guo, Yuqing Kong, Jialiang Liu",
        venue: "Accepted by the ACM Web Conference 2025 (WWW)",
        abstract: "Rating aggregation plays a crucial role in various fields, such as product recommendations, hotel rankings, and teaching evaluations. However, traditional averaging methods can be affected by participation bias, where some raters do not participate in the rating process, leading to potential distortions. In this paper, we consider a robust rating aggregation task under the participation bias. We assume that raters may not reveal their ratings with a certain probability depending on their individual ratings, resulting in partially observed samples. Our goal is to minimize the expected squared loss between the aggregated ratings and the average of all underlying ratings (possibly unobserved) in the worst-case scenario.",
        link: "https://arxiv.org/abs/2502.03737"
    },
    {
        title: "Robust Aggregation with Adversarial Experts",
        authors: "Yongkang Guo, Yuqing Kong",
        venue: "Accepted by the ACM Web Conference 2025 (WWW)",
        abstract: "We consider a robust aggregation problem in the presence of both truthful and adversarial experts. The truthful experts will report their private signals truthfully, while the adversarial experts can report arbitrarily. We assume experts are marginally symmetric in the sense that they share the same common prior and marginal posteriors. The rule maker needs to design an aggregator to predict the true world state from these experts' reports, without knowledge of the underlying information structures or adversarial strategies. We aim to find the optimal aggregator that outputs a forecast minimizing regret under the worst information structure and adversarial strategies.",
        link: "https://arxiv.org/abs/2403.08222"
    },
    {
        title: "Algorithmic Robust Forecast Aggregation",
        authors: "Yongkang Guo, Jason D. Hartline, Zhihuan Huang, Yuqing Kong, Anant Shah, Fang-Yi Yu",
        venue: "The 26th ACM Conference on Economics and Computation (EC)",
        abstract: "Forecast aggregation combines the predictions of multiple forecasters to improve accuracy. However, the lack of knowledge about forecasters' information structure hinders optimal aggregation. Given a family of information structures, robust forecast aggregation aims to find the aggregator with minimal worst-case regret compared to the omniscient aggregator. Previous approaches for robust forecast aggregation rely on heuristic observations and parameter tuning. We propose an algorithmic framework for robust forecast aggregation. Our framework provides efficient approximation schemes for general information aggregation with a finite family of possible information structures.",
        link: "https://arxiv.org/abs/2401.17743"
    },
    {
        title: "Near-Optimal Experimental Design Under the Budget Constraint in Online Platforms",
        authors: "Yongkang Guo, Yuan Yuan, Jinshan Zhang, Yuqing Kong, Zhihua Zhu, Zheng Cai",
        venue: "Accepted by the ACM Web Conference 2023 (WWW)",
        abstract: "A/B testing, or controlled experiments, is the gold standard approach to causally compare the performance of algorithms on online platforms. However, conventional Bernoulli randomization in A/B testing faces many challenges such as spillover and carryover effects. Our study focuses on another challenge, especially for A/B testing on two-sided platforms -- budget constraints. Buyers on two-sided platforms often have limited budgets, where the conventional A/B testing may be infeasible to be applied, partly because two variants of allocation algorithms may conflict and lead some buyers to exceed their budgets if they are implemented simultaneously. We develop a model to describe two-sided platforms where buyers have limited budgets. We then provide an optimal experimental design that guarantees small bias and minimum variance.",
        link: "https://arxiv.org/abs/2302.05005"
    }
];
