from ..models import Message
from .. import db

def send_message(data):
    new_message = Message(match_id=data['match_id'], sender_id=data['sender_id'], content=data['content'])
    db.session.add(new_message)
    db.session.commit()
    return new_message

def get_messages(match_id):
    messages = Message.query.filter_by(match_id=match_id).order_by(Message.timestamp).all()
    message_list = [{"sender_id": msg.sender_id, "content": msg.content, "timestamp": msg.timestamp} for msg in messages]
    return message_list
