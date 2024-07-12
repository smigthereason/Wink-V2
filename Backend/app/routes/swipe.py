from flask import Blueprint, request, jsonify
from ..services import swipe_service, profile_service

bp = Blueprint('swipe', __name__, url_prefix='/swipe')

@bp.route('/', methods=['POST'])
def swipe():
    data = request.json
    is_match = swipe_service.record_swipe(data)
    if is_match:
        return jsonify({"message": "It's a match!"}), 200
    return jsonify({"message": "Swipe recorded"}), 200

@bp.route('/matches/<int:user_id>', methods=['GET'])
def get_matches(user_id):
    matches = swipe_service.get_user_matches(user_id)
    return jsonify({"matches": matches}), 200

@bp.route('/profiles/<int:user_id>', methods=['GET'])
def get_swipe_profiles(user_id):
    profiles = profile_service.get_all_profiles()
    profile_list = [{
        "user_id": profile.user_id,
        "name": profile.name,
        "age": profile.age,
        "gender": profile.gender,
        "occupation": profile.occupation,
        "bio": profile.bio,
        "photos": profile.photos
    } for profile in profiles if profile.user_id != user_id]
    return jsonify({"profiles": profile_list}), 200
