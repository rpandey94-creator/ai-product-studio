"""Typed data contracts used by the evaluation pipeline."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from typing import Any


@dataclass(frozen=True)
class ToolCall:
    name: str
    authorized: bool = False

    @classmethod
    def from_dict(cls, payload: dict[str, Any] | None) -> "ToolCall | None":
        if not payload:
            return None
        return cls(name=str(payload.get("name", "")).strip(), authorized=bool(payload.get("authorized", False)))


@dataclass(frozen=True)
class EvaluationCase:
    id: str
    intent: str
    response: str
    required_terms: tuple[str, ...] = field(default_factory=tuple)
    forbidden_terms: tuple[str, ...] = field(default_factory=tuple)
    expected_tool: str | None = None
    tool_call: ToolCall | None = None
    should_escalate: bool = False
    escalated: bool = False
    severity: str = "Medium"

    @classmethod
    def from_dict(cls, payload: dict[str, Any]) -> "EvaluationCase":
        missing = [key for key in ("id", "intent", "response") if not str(payload.get(key, "")).strip()]
        if missing:
            raise ValueError(f"case is missing required fields: {', '.join(missing)}")
        return cls(
            id=str(payload["id"]),
            intent=str(payload["intent"]),
            response=str(payload["response"]),
            required_terms=tuple(str(item) for item in payload.get("required_terms", [])),
            forbidden_terms=tuple(str(item) for item in payload.get("forbidden_terms", [])),
            expected_tool=(str(payload["expected_tool"]) if payload.get("expected_tool") else None),
            tool_call=ToolCall.from_dict(payload.get("tool_call")),
            should_escalate=bool(payload.get("should_escalate", False)),
            escalated=bool(payload.get("escalated", False)),
            severity=str(payload.get("severity", "Medium")),
        )


@dataclass(frozen=True)
class CheckResult:
    name: str
    score: float
    passed: bool
    evidence: str


@dataclass(frozen=True)
class EvaluationResult:
    case_id: str
    intent: str
    severity: str
    passed: bool
    score: float
    checks: tuple[CheckResult, ...]
    failure_codes: tuple[str, ...]

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
