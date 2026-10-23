# ADR-001: modular clustering before end-to-end topics

Decision: establish normalization, embeddings, dimensionality reduction, clustering, labels, and evidence selection as independently evaluated stages. BERTopic is a benchmark, not an unquestioned production choice.

Why: cluster coherence, source coverage, reviewer agreement, stability, and cost fail differently. A modular pipeline preserves observability and permits a simpler TF-IDF baseline.

Rejected: treating a topic probability as universal product confidence, sentiment-only prioritization, and automatic issue creation in the first release.

