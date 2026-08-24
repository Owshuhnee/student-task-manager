from datetime import datetime
from extensions import db

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default="Backlog")
    priority = db.Column(db.String(20), nullable=False, default="Medium")
    due_at = db.Column(db.DateTime, nullable=True)
    notes = db.Column(db.Text, nullable=True)
    reflection = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description or "",
            "due_date": self.due_at.strftime("%Y-%m-%d") if self.due_at else None,
            "priority": self.priority,
            "status": self.status,
            "notes": self.notes,
            "reflection": self.reflection,
        }