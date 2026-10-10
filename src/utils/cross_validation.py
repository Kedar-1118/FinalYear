import time
import itertools
from typing import Dict, Any, List, Optional, Union, Tuple
import numpy as np
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import accuracy_score, f1_score


class MABKFoldEvaluator:
    """Stratified K-Fold Cross-Validation Evaluator for MAB decision trees and random forests.
    
    Evaluates model performance across k folds, tracking accuracy, macro F1 score,
    training runtime, and total sample evaluations without altering model logic.
    """

    def __init__(
        self,
        estimator,
        n_splits: int = 5,
        shuffle: bool = True,
        random_state: int = 42
    ):
        self.estimator = estimator
        self.n_splits = n_splits
        self.shuffle = shuffle
        self.random_state = random_state

    def evaluate(self, X: np.ndarray, y: np.ndarray) -> Dict[str, Any]:
        """Runs Stratified K-Fold cross validation and returns aggregate metrics."""
        X = np.asarray(X, dtype=np.float32)
        y = np.asarray(y)

        skf = StratifiedKFold(
            n_splits=self.n_splits,
            shuffle=self.shuffle,
            random_state=self.random_state
        )

        fold_accuracies = []
        fold_f1s = []
        fold_runtimes = []
        samples_evaluated_list = []

        for fold_idx, (train_idx, val_idx) in enumerate(skf.split(X, y)):
            X_train, y_train = X[train_idx], y[train_idx]
            X_val, y_val = X[val_idx], y[val_idx]

            # Clone estimator settings
            clf = self._clone_estimator(self.estimator)

            start_time = time.perf_counter()
            clf.fit(X_train, y_train)
            fit_time = time.perf_counter() - start_time

            preds = clf.predict(X_val)
            acc = float(accuracy_score(y_val, preds))
            f1 = float(f1_score(y_val, preds, average='macro', zero_division=0))

            fold_accuracies.append(acc)
            fold_f1s.append(f1)
            fold_runtimes.append(fit_time)

            if hasattr(clf, 'total_samples_evaluated_'):
                samples_evaluated_list.append(getattr(clf, 'total_samples_evaluated_'))

        results = {
            "n_splits": self.n_splits,
            "fold_accuracies": fold_accuracies,
            "mean_accuracy": float(np.mean(fold_accuracies)),
            "std_accuracy": float(np.std(fold_accuracies)),
            "fold_f1_scores": fold_f1s,
            "mean_f1_score": float(np.mean(fold_f1s)),
            "mean_runtime_seconds": float(np.mean(fold_runtimes)),
            "total_runtime_seconds": float(np.sum(fold_runtimes)),
            "mean_samples_evaluated": float(np.mean(samples_evaluated_list)) if samples_evaluated_list else 0.0
        }
        return results

    def _clone_estimator(self, estimator):
        """Creates a fresh unfitted copy of the estimator with identical parameters."""
        params = estimator.get_params()
        return estimator.__class__(**params)


class MABGridSearchCV:
    """Exhaustive Hyperparameter Grid Search for MAB Decision Trees and Random Forests.
    
    Searches specified parameter combinations using stratified cross-validation,
    identifying optimal hyperparameters based on validation accuracy or F1 score.
    """

    def __init__(
        self,
        estimator_class,
        param_grid: Dict[str, List[Any]],
        cv: int = 3,
        scoring: str = "accuracy",
        random_state: int = 42
    ):
        self.estimator_class = estimator_class
        self.param_grid = param_grid
        self.cv = cv
        self.scoring = scoring
        self.random_state = random_state

        self.best_params_: Optional[Dict[str, Any]] = None
        self.best_score_: float = -1.0
        self.best_estimator_ = None
        self.cv_results_: List[Dict[str, Any]] = []

    def fit(self, X: np.ndarray, y: np.ndarray):
        """Performs grid search across all parameter combinations."""
        keys = list(self.param_grid.keys())
        values = list(self.param_grid.values())
        param_combinations = [dict(zip(keys, v)) for v in itertools.product(*values)]

        best_score = -1.0
        best_combination = None
        best_model = None
        cv_results = []

        for params in param_combinations:
            # Instantiate estimator with grid candidate params
            model = self.estimator_class(**params)
            evaluator = MABKFoldEvaluator(
                estimator=model,
                n_splits=self.cv,
                shuffle=True,
                random_state=self.random_state
            )
            eval_res = evaluator.evaluate(X, y)
            score = eval_res["mean_accuracy"] if self.scoring == "accuracy" else eval_res["mean_f1_score"]

            record = {
                "params": params,
                "mean_test_score": score,
                "std_test_score": eval_res["std_accuracy"],
                "mean_runtime": eval_res["mean_runtime_seconds"],
                "mean_samples_evaluated": eval_res["mean_samples_evaluated"]
            }
            cv_results.append(record)

            if score > best_score:
                best_score = score
                best_combination = params
                best_model = model

        # Fit best model on entire dataset
        if best_model is not None:
            best_model.fit(X, y)

        self.best_params_ = best_combination
        self.best_score_ = best_score
        self.best_estimator_ = best_model
        self.cv_results_ = cv_results
        return self
