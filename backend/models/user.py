from datetime import datetime
from flask_login import UserMixin
from extensions import db

class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    tasks = db.relationship("Task", backref="user", cascade="all, delete-orphan")

    # cascade="all, delete-orphan" - deleting a user deletes their tasks" rule from the schema.
    # UserMixin - makes class compatable with session-cookie auth