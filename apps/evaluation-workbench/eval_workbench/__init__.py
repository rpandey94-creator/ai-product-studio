"""Dependency-free evaluation workbench for synthetic conversational AI cases."""

from .evaluators import evaluate_case, evaluate_dataset
from .models import EvaluationCase, EvaluationResult

__all__ = ["EvaluationCase", "EvaluationResult", "evaluate_case", "evaluate_dataset"]
