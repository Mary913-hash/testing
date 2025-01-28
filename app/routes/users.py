from flask import Blueprint, jsonify, request
from app.models import User
from app import db
from app.schemas import UserSchema

users_bp = Blueprint("users", __name__)
user_schema = UserSchema()
users_schema = UserSchema(many=True)

# Create a new user
@users_bp.route("/", methods=["POST"])
def register_user():
    data = request.json
    if not all(key in data for key in ["name", "email", "password"]):
        return jsonify({"error": "Missing required fields: name, email, password"}), 400

    user = User(name=data["name"], email=data["email"], password=data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify(user_schema.dump(user)), 201

# Retrieve all users
@users_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify(users_schema.dump(users)), 200

# Retrieve a specific user by ID
@users_bp.route("/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user_schema.dump(user)), 200

# Update a user by ID
@users_bp.route("/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.json
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    db.session.commit()
    return jsonify(user_schema.dump(user)), 200

# Delete a user by ID
@users_bp.route("/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200
