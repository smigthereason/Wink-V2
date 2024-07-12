from ..models import Swipe, Match, User
from .. import db

def record_swipe(data):
    new_swipe = Swipe(user_id=data['user_id'], target_id=data['target_id'], like=data['like'])
    db.session.add(new_swipe)
    db.session.commit()
    return new_swipe

def check_match(data):
    if data['like']:
        target_swipe = Swipe.query.filter_by(user_id=data['target_id'], target_id=data['user_id'], like=True).first()
        if target_swipe:
            new_match = Match(user1_id=data['user_id'], user2_id=data['target_id'])
            db.session.add(new_match)
            db.session.commit()
            return new_match
    return None

def get_user_matches(user_id):
    user_matches = Match.query.filter((Match.user1_id == user_id) | (Match.user2_id == user_id)).all()
    matches = []
    for match in user_matches:
        matched_user_id = match.user2_id if match.user1_id == user_id else match.user1_id
        matched_user = User.query.get(matched_user_id)
        matches.append({"user_id": matched_user_id, "username": matched_user.username})
    return matches
