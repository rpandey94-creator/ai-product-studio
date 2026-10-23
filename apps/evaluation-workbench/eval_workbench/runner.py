"""Command-line runner that emits JSON, CSV, and JUnit-compatible evidence."""

from __future__ import annotations

import argparse
import csv
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

from .evaluators import evaluate_dataset
from .models import EvaluationCase, EvaluationResult


def load_cases(path: Path) -> list[EvaluationCase]:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, list):
        raise ValueError("dataset root must be a JSON array")
    return [EvaluationCase.from_dict(item) for item in payload]


def build_report(results: list[EvaluationResult], dataset: Path) -> dict:
    passed = sum(result.passed for result in results)
    return {
        "schema_version": "1.0",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dataset": dataset.name,
        "disclosure": "Synthetic test data; deterministic local evaluation; no model API or client data.",
        "summary": {
            "total": len(results),
            "passed": passed,
            "failed": len(results) - passed,
            "pass_rate": round(passed / len(results), 3),
            "average_score": round(sum(result.score for result in results) / len(results), 3),
        },
        "results": [result.to_dict() for result in results],
    }


def write_csv(path: Path, results: list[EvaluationResult]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["case_id", "intent", "severity", "passed", "score", "failure_codes"])
        for result in results:
            writer.writerow([result.case_id, result.intent, result.severity, result.passed, result.score, "|".join(result.failure_codes)])


def write_junit(path: Path, results: list[EvaluationResult]) -> None:
    suite = ET.Element("testsuite", name="ai-evaluation-workbench", tests=str(len(results)), failures=str(sum(not r.passed for r in results)))
    for result in results:
        case = ET.SubElement(suite, "testcase", classname="synthetic-conversation", name=result.case_id)
        if not result.passed:
            failure = ET.SubElement(case, "failure", message=",".join(result.failure_codes))
            failure.text = json.dumps(result.to_dict(), indent=2)
    ET.ElementTree(suite).write(path, encoding="utf-8", xml_declaration=True)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run deterministic conversational AI evaluations.")
    parser.add_argument("--dataset", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--csv", type=Path)
    parser.add_argument("--junit", type=Path)
    parser.add_argument("--fail-under", type=float, default=0.0, help="Exit 1 when pass rate is below this 0-1 threshold.")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    try:
        results = evaluate_dataset(load_cases(args.dataset))
        report = build_report(results, args.dataset)
        args.out.parent.mkdir(parents=True, exist_ok=True)
        args.out.write_text(json.dumps(report, indent=2), encoding="utf-8")
        if args.csv:
            args.csv.parent.mkdir(parents=True, exist_ok=True)
            write_csv(args.csv, results)
        if args.junit:
            args.junit.parent.mkdir(parents=True, exist_ok=True)
            write_junit(args.junit, results)
        print(json.dumps(report["summary"], indent=2))
        return 1 if report["summary"]["pass_rate"] < args.fail_under else 0
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"evaluation failed: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
