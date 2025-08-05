"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def post_user_signup_route():
    request_body = request.json
    if not "email" in request_body or not "password" in request_body:
        return "Invalid Request Body", 400

    new_user = User(email = request_body["email"], password = request_body["password"])
    db.session.add(new_user)
    db.session.commit()
    return f"Added user with email of {new_user.email} to the database.", 200

@api.route('/login', methods=['POST'])
def post_user_login_route():
    request_body = request.json
    if not "email" in request_body or not "password" in request_body:
        return "Invalid Request Body", 400

    user = db.session.execute(select(User).where(User.email == request_body["email"], User.password == request_body["password"])).scalar_one_or_none()
    if user is None:
        return "Invalid email or password", 400
    print(user.id)
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token":access_token,"user_id": user.id}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def get_user_protected_route():
    current_user_id = get_jwt_identity()
    user = db.session.execute(select(User).where(User.id == current_user_id)).scalar_one_or_none()
    return jsonify({"id":user.id,"email": user.email}), 200

