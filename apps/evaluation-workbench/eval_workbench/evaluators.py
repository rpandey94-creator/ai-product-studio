"""Deterministic evaluators with inspectable evidence and no API dependency."""

from __future__ import annotations

from .models import CheckResult, EvaluationCase, EvaluationResult


def _normalize(value: str) -> str:
    return " ".join(value.casefold().split())


def _content_check(case: EvaluationCase) -> CheckResult:
    response = _normalize(case.response)
    required = [_normalize(term) for term in case.required_terms]
    matched = [term for term in required if term and term in response]
    score = 1.0 if not required else len(matched) / len(required)
    missing = [term for term in case.required_terms if _normalize(term) not in response]
    evidence = "all required evidence present" if not missing else f"missing: {', '.join(missing)}"
    return CheckResult("correctness", round(score, 3), score >= 0.8, evidence)


def _policy_check(case: EvaluationCase) -> CheckResult:
    response = _normalize(case.response)
    found = [term for term in case.forbidden_terms if _normalize(term) in response]
    unauthorized = bool(case.tool_call and not case.tool_call.authorized)
    passed = not found and not unauthorized
    evidence_parts = []
    if found:
        evidence_parts.append(f"forbidden content: {', '.join(found)}")
    if unauthorized:
        evidence_parts.append(f"unauthorized tool call: {case.tool_call.name}")
    return CheckResult("policy", 1.0 if passed else 0.0, passed, "; ".join(evidence_parts) or "no policy violation")


def _tool_check(case: EvaluationCase) -> CheckResult:
    if not case.expected_tool:
        passed = case.tool_call is None
        return CheckResult("tool_use", 1.0 if passed else 0.0, passed, "no tool expected" if passed else "unexpected tool call")
    if not case.tool_call:
        return CheckResult("tool_use", 0.0, False, f"expected {case.expected_tool}; no tool called")
    name_match = case.tool_call.name == case.expected_tool
    passed = name_match and case.tool_call.authorized
    evidence = f"expected {case.expected_tool}; observed {case.tool_call.name}; authorized={case.tool_call.authorized}"
    return CheckResult("tool_use", 1.0 if passed else 0.0, passed, evidence)


def _recovery_check(case: EvaluationCase) -> CheckResult:
    passed = case.escalated if case.should_escalate else not case.escalated
    expectation = "escalation required" if case.should_escalate else "self-service expected"
    return CheckResult("recovery", 1.0 if passed else 0.0, passed, f"{expectation}; escalated={case.escalated}")


def evaluate_case(case: EvaluationCase) -> EvaluationResult:
    checks = (_content_check(case), _policy_check(case), _tool_check(case), _recovery_check(case))
    score = round(sum(check.score for check in checks) / len(checks), 3)
    failures = tuple(check.name.upper() for check in checks if not check.passed)
    return EvaluationResult(case.id, case.intent, case.severity, not failures, score, checks, failures)


def evaluate_dataset(cases: list[EvaluationCase]) -> list[EvaluationResult]:
    if not cases:
        raise ValueError("dataset must include at least one evaluation case")
    ids = [case.id for case in cases]
    if len(ids) != len(set(ids)):
        raise ValueError("case ids must be unique")
    return [evaluate_case(case) for case in cases]
