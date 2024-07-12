# #profile.py
# import logging
# from flask import Blueprint, request, jsonify
# from..services import profile_service
# from flask_cors import cross_origin
# from marshmallow import Schema, fields, ValidationError

# bp = Blueprint('profile', __name__, url_prefix='/profile')

#     # Configure logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# class ProfileSchema(Schema):
#     user_id = fields.Integer(required=True)
#     name = fields.String(required=True)
#     age = fields.Integer(required=True)
#     gender = fields.String(required=True)
#     occupation = fields.String(required=True)
#     bio = fields.String()
#     photos = fields.String(required=True)
#     videos = fields.String()
#     preferences = fields.String(required=True)
#     hobbies = fields.String()

# @bp.route('/', methods=['POST'])
#     # @cross_origin(supports_credentials=True)
# def create_profile():
#     data = request.json
#     schema = ProfileSchema()
#     try:
#         result = schema.load(data)
#         logger.info(f"Validated data: {result}")
#         profile = profile_service.create_or_update_profile(result)
#         return jsonify({"message": "Profile created/updated", "profile": profile}), 201
#     except ValidationError as e:
#         return jsonify({"error": str(e)}), 400
#     except ValueError as e:
#         return jsonify({"error": str(e)}), 400
#     except Exception as e:
#         logger.error("Error occurred: %s", str(e))
#         return jsonify({"error": "An error occurred while processing your request"}), 500

# @bp.route('/<int:user_id>', methods=['GET'])
# @cross_origin(supports_credentials=True)
# def get_profile(user_id):
#     try:
#         profile = profile_service.get_profile(user_id)
#         if profile:
#             return jsonify({"profile": profile}), 200
#             return jsonify({"message": "Profile not found"}), 404
#     except Exception as e:
#             logger.error("Error occurred: %s", str(e))
#             return jsonify({"error": "An error occurred while processing your request"}), 500

# @bp.route('/all', methods=['GET'])
# @cross_origin(supports_credentials=True)
# def get_all_profiles():
#     try:
#         profiles = profile_service.get_all_profiles()
#         return jsonify({"profiles": profiles}), 200
#     except Exception as e:
#         logger.error("Error occurred: %s", str(e))
#         return jsonify({"error": "An error occurred while processing your request"}), 500
import logging
from flask import Blueprint, request, jsonify
from ..services import profile_service
from flask_cors import cross_origin
from marshmallow import Schema, fields, ValidationError
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('profile', __name__, url_prefix='/profile')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ProfileSchema(Schema):
    user_id = fields.Integer(required=True)
    name = fields.String(required=True)
    age = fields.Integer(required=True)
    gender = fields.String(required=True)
    occupation = fields.String(required=True)
    bio = fields.String()
    photos = fields.String(required=True)
    videos = fields.String()
    preferences = fields.String(required=True)
    hobbies = fields.String()

@bp.route('/', methods=['POST'])
@jwt_required()
@cross_origin(supports_credentials=True)
def create_profile():
    data = request.json
    data["user_id"] = get_jwt_identity()

    schema = ProfileSchema()
    try:
        result = schema.load(data)
        logger.info(f"Validated data: {result}")
        profile = profile_service.create_or_update_profile(result)
        return jsonify({"message": "Profile created/updated", "profile": profile}), 201
    except ValidationError as e:
        return jsonify({"error": str(e)}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        logger.error("Error occurred: %s", str(e))
        return jsonify({"error": f"An error occurred while processing your request"}), 500

@bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
@cross_origin(supports_credentials=True)
def get_profile(user_id):
    try:
        if user_id == 0:
            user_id = get_jwt_identity()

        profile = profile_service.get_profile(user_id)
        if profile:
            return jsonify({"profile": profile}), 200
        return jsonify({"message": "Profile not found"}), 404
    except Exception as e:
        logger.error("Error occurred: %s", str(e))
        return jsonify({"error": f"An error occurred while processing your request {str(e)} user_id: {user_id}"}), 500

@bp.route('/all', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_all_profiles():
    try:
        profiles = profile_service.get_all_profiles()
        return jsonify({"profiles": profiles}), 200
    except Exception as e:
        logger.error("Error occurred: %s", str(e))
        return jsonify({"error": "An error occurred while processing your request"}), 500