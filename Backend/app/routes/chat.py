from flask import Blueprint, request, jsonify
from ..services import chat_service

bp = Blueprint('chat', __name__, url_prefix='/chat')

@bp.route('/send', methods=['POST'])
def send_message():
    data = request.json
    new_message = chat_service.send_message(data)
    return jsonify({"message": "Message sent"}), 201

@bp.route('/<int:match_id>', methods=['GET'])
def get_messages(match_id):
    messages = chat_service.get_messages(match_id)
    return jsonify({"messages": messages}), 200
