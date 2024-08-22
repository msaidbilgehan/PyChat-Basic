

from flask_jwt_extended import jwt_required, get_jwt_identity
from Library import app
from Library.Database.models import User
from Library.Database.tools import authenticate_user, check_and_create_user

from flask import jsonify, request
from flask_jwt_extended import create_access_token


@app.route('/api/signup', methods=['POST'])
def signup():
    if request.json is None:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if username is None or email is None or password is None:
        return jsonify({"msg": "Missing username, email, or password"}), 400

    is_ok = check_and_create_user(email, username, password)

    if not is_ok:
        return jsonify({"msg": "Username already exists"}), 409

    return jsonify({"msg": "User created successfully"}), 201


@app.route('/api/login', methods=['POST'])
def login():
    if request.json is None:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if username is None or password is None:
        return jsonify({"msg": "Missing username or password"}), 400

    user = authenticate_user(username, password)
    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200


@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
