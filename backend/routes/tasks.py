from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from extensions import db
from models import Task

tasks_bp = Blueprint("tasks", __name__, url_prefix="/api")

@tasks_bp.route("/tasks", methods=["GET"])
@login_required
def list_tasks():
    tasks = Task.query.filter_by(user_id=current_user.id).order_by(Task.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tasks]), 200


@tasks_bp.route("/tasks", methods=["POST"])
@login_required
def create_task():
    data = request.get_json() or {}
    title = data.get("title")
    if not title:
        return jsonify({"error": "title is required"}), 400

    due_at = data.get("dueAt")
    task = Task(
        title=title,
        status=data.get("status", "Backlog"),
        priority=data.get("priority", "Medium"),
        due_at=datetime.fromisoformat(due_at) if due_at else None,
        reflection=data.get("reflection"),
        user_id=current_user.id,
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


@tasks_bp.route("/tasks/<int:task_id>", methods=["PUT", "PATCH"])
@login_required
def update_task(task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()
    if not task:
        return jsonify({"error": "Task not found"}), 404

    data = request.get_json() or {}
    if "title" in data:
        task.title = data["title"]
    if "status" in data:
        task.status = data["status"]
    if "priority" in data:
        task.priority = data["priority"]
    if "dueAt" in data:
        task.due_at = datetime.fromisoformat(data["dueAt"]) if data["dueAt"] else None
    if "reflection" in data:
        task.reflection = data["reflection"]

    db.session.commit()
    return jsonify(task.to_dict()), 200


@tasks_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
@login_required
def delete_task(task_id):
    task = Task.query.filter_by(id=task_id, user_id=current_user.id).first()
    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"}), 200