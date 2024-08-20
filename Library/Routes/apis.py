

from Library import app
from Library.Database.tools import check_user

from flask import jsonify, request
from flask_jwt_extended import create_access_token


@app.route('/signup', methods=['POST'])
def signup():
    if request.json is None:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if username is None or email is None or password is None:
        return jsonify({"msg": "Missing username, email, or password"}), 400

    response = check_user(email, username, password)

    if response == -1:
        return jsonify({"msg": "Username already exists"}), 409

    return jsonify({"msg": "User created successfully"}), 201


@app.route('/login', methods=['POST'])
def login():
    if request.json is None:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200