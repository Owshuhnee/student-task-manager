import os
from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db, login_manager
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)

    CORS(app, supports_credentials=True, origins=[os.environ.get("FRONTEND_ORIGIN")])

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)