# Permission-Aware Enterprise Knowledge Assistant — flagship blueprint

Status: **Interactive UX Prototype**. Nine synthetic role/question combinations demonstrate UI states; there is no live identity provider, vector index, or language model.

## Product contract

- Inputs: authenticated actor, group claims, question, document corpus with ACL and freshness metadata.
- Output: answer claims with citations, or a typed abstention/escalation.
- Invariant: unauthorized chunks never enter retrieval candidates, model context, trace payloads, or caches.

## First executable slice

1. Create a synthetic policy corpus with document-level ACLs and revisions.
2. Implement deterministic permission filtering before BM25 retrieval.
3. Add dense retrieval, then measure whether hybrid fusion improves recall.
4. Generate only from authorized passages and validate citation support.
5. Emit an audit event without storing sensitive text by default.

## Evaluation matrix

Test every `{role × query × document}` authorization outcome, revoked access, inherited access, stale documents, unanswerable questions, contradictory policies, and prompt injection inside a document. Gate on zero unauthorized-context events before answer quality.

## Security and cost

Document ACLs are source-of-truth metadata, revocation has an explicit freshness SLO, and caches are identity-scoped. Track retrieval, reranking, generation, index storage, and human escalation separately.

## Milestones

- M1: ACL corpus and permission matrix tests.
- M2: BM25 baseline with citations and abstention.
- M3: Qdrant filtered dense/hybrid experiment.
- M4: traced API connected to the reviewed browser UX.

