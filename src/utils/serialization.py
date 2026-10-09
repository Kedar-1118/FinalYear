import json
import os
from typing import Dict, Any, Union, Optional
import numpy as np


def export_graphviz(
    model,
    filepath: Optional[str] = None,
    feature_names: Optional[list] = None,
    class_names: Optional[list] = None
) -> str:
    """Exports a fitted MABDecisionTreeClassifier to Graphviz DOT format for tree visualization.
    
    Parameters
    ----------
    model : MABDecisionTreeClassifier
        Fitted decision tree model instance.
    filepath : str, optional
        File path to save the .dot file. If None, returns the DOT string directly.
    feature_names : list of str, optional
        Human-readable feature labels.
    class_names : list of str, optional
        Human-readable class labels.
        
    Returns
    -------
    str
        Graphviz DOT language string.
    """
    if not hasattr(model, 'root_') or model.root_ is None:
        raise ValueError("Model must be fitted before exporting to Graphviz DOT format.")

    dot_lines = [
        'digraph MABDecisionTree {',
        '  node [shape=box, style="filled, rounded", color="black", fontname="helvetica"];',
        '  edge [fontname="helvetica"];'
    ]

    node_counter = 0

    def _add_node(node):
        nonlocal node_counter
        curr_id = node_counter
        node_counter += 1

        if node.is_leaf:
            pred_class = int(np.argmax(node.value)) if node.value is not None else 0
            c_label = class_names[pred_class] if class_names and pred_class < len(class_names) else f"Class {pred_class}"
            prob_str = f"prob={np.round(node.value, 3).tolist()}" if node.value is not None else ""
            label_text = f"Leaf\\n{c_label}\\n{prob_str}"
            fillcolor = "#e5f5e0"
            dot_lines.append(f'  {curr_id} [label="{label_text}", fillcolor="{fillcolor}"];')
        else:
            f_name = feature_names[node.feature] if feature_names and node.feature < len(feature_names) else f"X[{node.feature}]"
            thresh_val = round(float(node.threshold), 4)
            mode_str = f"mode={node.solver_mode}" if node.solver_mode else ""
            label_text = f"{f_name} &le; {thresh_val}\\nbin={node.bin_idx}\\n{mode_str}"
            fillcolor = "#deebf7"
            dot_lines.append(f'  {curr_id} [label="{label_text}", fillcolor="{fillcolor}"];')

            left_id = _add_node(node.left)
            dot_lines.append(f'  {curr_id} -> {left_id} [labeldistance=2.5, labelangle=45, headlabel="True"];')

            right_id = _add_node(node.right)
            dot_lines.append(f'  {curr_id} -> {right_id} [labeldistance=2.5, labelangle=-45, headlabel="False"];')

        return curr_id

    _add_node(model.root_)
    dot_lines.append('}')
    dot_string = '\n'.join(dot_lines)

    if filepath is not None:
        abs_path = os.path.abspath(filepath)
        os.makedirs(os.path.dirname(abs_path), exist_ok=True)
        with open(abs_path, 'w', encoding='utf-8') as f:
            f.write(dot_string)

    return dot_string


def save_model_json(model, filepath: str) -> Dict[str, Any]:
    """Serializes a fitted MABDecisionTreeClassifier structure to JSON file."""
    if not hasattr(model, 'root_') or model.root_ is None:
        raise ValueError("Model must be fitted before serializing to JSON.")

    def _node_to_dict(node):
        if node is None:
            return None
        return {
            "is_leaf": node.is_leaf,
            "depth": node.depth,
            "feature": int(node.feature),
            "threshold": float(node.threshold),
            "bin_idx": int(node.bin_idx),
            "solver_mode": str(node.solver_mode),
            "value": node.value.tolist() if node.value is not None else None,
            "left": _node_to_dict(node.left),
            "right": _node_to_dict(node.right)
        }

    model_dict = {
        "model_type": model.__class__.__name__,
        "n_features": int(model.n_features_) if hasattr(model, 'n_features_') else 0,
        "classes": model.classes_.tolist() if hasattr(model, 'classes_') else [],
        "n_nodes": int(model.n_nodes_) if hasattr(model, 'n_nodes_') else 0,
        "total_samples_evaluated": int(model.total_samples_evaluated_) if hasattr(model, 'total_samples_evaluated_') else 0,
        "params": model.get_params(),
        "tree_structure": _node_to_dict(model.root_)
    }

    abs_path = os.path.abspath(filepath)
    os.makedirs(os.path.dirname(abs_path), exist_ok=True)
    with open(abs_path, 'w', encoding='utf-8') as f:
        json.dump(model_dict, f, indent=2)

    return model_dict


def load_model_json(filepath: str, model_class) -> Any:
    """Loads a serialized JSON tree structure into an unfitted model_class instance."""
    abs_path = os.path.abspath(filepath)
    with open(abs_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    model = model_class(**data.get("params", {}))
    model.n_features_ = data.get("n_features", 0)
    model.classes_ = np.array(data.get("classes", [0, 1]))
    model.n_classes_ = len(model.classes_)
    model.n_nodes_ = data.get("n_nodes", 0)
    model.total_samples_evaluated_ = data.get("total_samples_evaluated", 0)

    from ..models.tree import TreeNode

    def _dict_to_node(d):
        if d is None:
            return None
        node = TreeNode(is_leaf=d["is_leaf"], depth=d["depth"])
        node.feature = d["feature"]
        node.threshold = d["threshold"]
        node.bin_idx = d["bin_idx"]
        node.solver_mode = d["solver_mode"]
        node.value = np.array(d["value"]) if d["value"] is not None else None
        node.left = _dict_to_node(d["left"])
        node.right = _dict_to_node(d["right"])
        return node

    model.root_ = _dict_to_node(data.get("tree_structure"))
    return model
