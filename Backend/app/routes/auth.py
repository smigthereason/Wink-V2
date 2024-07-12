from flask import Blueprint, request, jsonify
from .. import db
from flask_bcrypt import check_password_hash
from app.models import User
from ..services import auth_service
import traceback
from flask_jwt_extended import create_access_token

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print(f"Received registration data: {data}")  # Log received data
        result = auth_service.register_user(data)
        if result['status'] == 201:
            access_token = create_access_token(identity=result['user']['id'])
            return jsonify({"message": result["message"], "token": access_token}), 201
        return jsonify(result), result['status']
    except Exception as e:
        print(f"Error in /register route: {str(e)}")
        print(traceback.format_exc())  # This will print the full stack trace
        return jsonify({"message": "An unexpected error occurred"}), 500

    
@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()  # Changed from email to username
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"msg": "Wrong username or password"}), 401

@bp.route('/test_cors', methods=['GET', 'OPTIONS'])
def test_cors():
    response = jsonify({"message": "CORS headers are working!"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5001")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response
