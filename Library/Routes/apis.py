

from flask_jwt_extended import jwt_required, get_jwt_identity
from Library import app
from Library.Database.models import User
from Library.Database.tools import authenticate_user, check_and_create_user, get_messages, get_user_if_exist, send_message

from flask import jsonify, make_response, request
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

    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"msg": "Signin successful"}), 201)
    response.set_cookie('access_token_cookie', access_token, httponly=True, secure=False)
    response.set_cookie('username', username, httponly=True, secure=False)
    return response


@app.route('/api/login', methods=['POST'])
def login():
    if request.json is None:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if username is None or password is None:
        return jsonify({"msg": "Missing username or password"}), 400

    is_user_authenticated = authenticate_user(username, password)
    if not is_user_authenticated:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    response = make_response(jsonify({"msg": "Login successful"}), 200)
    response.set_cookie('access_token_cookie', access_token, httponly=True, secure=False)
    response.set_cookie('username', username, httponly=True, secure=False)
    return response


@app.route('/api/send_message', methods=['POST'])
@jwt_required()
def post_message():
    try:
        if request.json:
            content = request.json.get('message')
            if not content:
                return jsonify({"msg": "No message provided"}), 400

        username = get_jwt_identity()
        user = get_user_if_exist(username)

        if user is None:
            return jsonify({"msg": "User not found"}), 404

        if send_message(username, content):
            return jsonify({"msg": "Message sent successfully", "message": content}), 201
        else:
            return jsonify({"msg": "Failed to send message"}), 500
    except Exception as e:
        return jsonify({"msg": "Failed to send message", "error": str(e)}), 500

@app.route('/api/listen_messages', methods=['GET'])
@jwt_required()
def listen_messages():
    current_user = get_jwt_identity()
    user = get_user_if_exist(current_user)

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    # Son istek zamanı parametresini al
    last_request_time = request.args.get('last_time', None)
    messages_list = get_messages(user, last_request_time)

    return jsonify(messages=messages_list), 200