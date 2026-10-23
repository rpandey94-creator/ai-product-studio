import json
import tempfile
import unittest
from pathlib import Path

from eval_workbench.evaluators import evaluate_case, evaluate_dataset
from eval_workbench.models import EvaluationCase
from eval_workbench.runner import load_cases, main


ROOT = Path(__file__).resolve().parents[1]
DATASET = ROOT / "data" / "synthetic_cases.json"
TEST_TEMP = ROOT / ".test-tmp"


class EvaluationPipelineTests(unittest.TestCase):
    def test_positive_case_passes(self):
        case = load_cases(DATASET)[0]
        result = evaluate_case(case)
        self.assertTrue(result.passed)
        self.assertEqual(result.score, 1.0)

    def test_negative_policy_and_tool_case_fails_with_evidence(self):
        case = load_cases(DATASET)[2]
        result = evaluate_case(case)
        self.assertFalse(result.passed)
        self.assertIn("POLICY", result.failure_codes)
        self.assertIn("TOOL_USE", result.failure_codes)

    def test_empty_dataset_is_rejected(self):
        with self.assertRaisesRegex(ValueError, "at least one"):
            evaluate_dataset([])

    def test_duplicate_case_ids_are_rejected(self):
        case = EvaluationCase(id="same", intent="test", response="ok")
        with self.assertRaisesRegex(ValueError, "unique"):
            evaluate_dataset([case, case])

    def test_missing_required_fields_are_rejected(self):
        with self.assertRaisesRegex(ValueError, "missing required fields"):
            EvaluationCase.from_dict({"id": "broken", "intent": ""})

    def test_runner_writes_machine_readable_report(self):
        TEST_TEMP.mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(dir=TEST_TEMP) as folder:
            output = Path(folder) / "report.json"
            exit_code = main(["--dataset", str(DATASET), "--out", str(output)])
            report = json.loads(output.read_text(encoding="utf-8"))
        self.assertEqual(exit_code, 0)
        self.assertEqual(report["summary"]["total"], 8)
        self.assertGreater(report["summary"]["passed"], 0)
        self.assertGreater(report["summary"]["failed"], 0)

    def test_quality_gate_can_fail_the_process(self):
        TEST_TEMP.mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(dir=TEST_TEMP) as folder:
            output = Path(folder) / "report.json"
            exit_code = main(["--dataset", str(DATASET), "--out", str(output), "--fail-under", "1"])
        self.assertEqual(exit_code, 1)


if __name__ == "__main__":
    unittest.main()
