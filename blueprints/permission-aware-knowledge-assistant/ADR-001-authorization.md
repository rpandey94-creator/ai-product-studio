# ADR-001: authorize before retrieval

Decision: resolve entitlements and apply corpus filters before retrieval; re-check cited documents before returning an answer.

Why: post-generation redaction cannot reliably remove information the model already received. Search-time payload filtering and an explicit role/document matrix make the boundary testable.

Rejected: a single shared index without ACL metadata, generate-then-redact, and answer confidence as a substitute for authorization.

