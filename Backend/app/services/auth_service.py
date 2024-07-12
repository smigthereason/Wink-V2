import logging
from flask_bcrypt import generate_password_hash
from sqlalchemy.exc import IntegrityError
from ..models import User
from .. import db
import traceback

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)





def register_user(data):
    try:
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return {
                "message": "A user with this email already exists",
                "status": 409
            }

        existing_username = User.query.filter_by(username=data['username']).first()
        if existing_username:
            return {
                "message": "This username is already taken",
                "status": 409
            }

        hashed_password = generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            username=data['username'],
            email=data['email'],
            password=hashed_password,
            gender=data.get('gender')
        )
        db.session.add(new_user)
        db.session.commit()
        return {
            "message": "User registered successfully",
            "user": {"id": new_user.id, "username": new_user.username, "email": new_user.email},
            "status": 201
        }
    except IntegrityError as e:
        db.session.rollback()
        return {
            "message": "An error occurred. The username or email might already be taken.",
            "status": 409
        }
    except Exception as e:
        db.session.rollback()
        return {
            "message": "An unexpected error occurred",
            "status": 500
        }
