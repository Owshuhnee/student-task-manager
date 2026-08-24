from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from extensions import db
from models import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "name, email, and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "An account with this email already exists"}), 409

    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    login_user(user)
    return jsonify({"id": user.id, "name": user.name, "email": user.email}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Incorrect email or password"}), 401

    login_user(user)
    return jsonify({"id": user.id, "name": user.name, "email": user.email}), 200


@auth_bp.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out"}), 200


@auth_bp.route("/me", methods=["GET"])
@login_required
def me():
    return jsonify({"id": current_user.id, "name": current_user.name, "email": current_user.email}), 200

@auth_bp.route("/me", methods=["PATCH"])
@login_required
def update_me():
    data = request.get_json() or {}
    name = data.get("name")
    email = data.get("email")

    if email and email != current_user.email:
        if User.query.filter(User.email == email, User.id != current_user.id).first():
            return jsonify({"error": "An account with this email already exists"}), 409
        current_user.email = email

    if name:
        current_user.name = name

    db.session.commit()
    return jsonify({"id": current_user.id, "name": current_user.name, "email": current_user.email}), 200


@auth_bp.route("/me/password", methods=["PATCH"])
@login_required
def change_password():
    data = request.get_json() or {}
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    if not current_password or not new_password:
        return jsonify({"error": "currentPassword and newPassword are required"}), 400

    if not current_user.check_password(current_password):
        return jsonify({"error": "Current password is incorrect"}), 401

    current_user.set_password(new_password)
    db.session.commit()
    return jsonify({"message": "Password updated"}), 200