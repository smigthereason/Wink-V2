# # profile_service.py

# import logging
# from ..models import Profile
# from .. import db
# from sqlalchemy.exc import SQLAlchemyError

# logger = logging.getLogger(__name__)


# def create_or_update_profile(data):
#     user_id = data.get('user_id')
#     if not user_id:
#         raise ValueError("user_id is required")

#     try:
#         profile = Profile.query.get(user_id)
#         if profile:
#             # Update existing profile
#             for key, value in data.items():
#                 if hasattr(profile, key):
#                     setattr(profile, key, value)
#         else:
#             # Create new profile
#             profile = Profile(**data)
#             db.session.add(profile)

#         # Handle media files if provided
#         if 'media' in data:
#             profile.media = data['media']

#         db.session.commit()
#         return profile.to_dict()
#     except Exception as e:
#         if db.session.is_active:
#             db.session.rollback()
#         logger.exception(f"Error saving profile: {str(e)}")
#         raise

# def get_profile(user_id):
#     try:
#         profile = Profile.query.get(user_id)
#         if profile:
#             return profile.to_dict()
#         else:
#             logger.info(f"No profile found for user_id: {user_id}")
#             return None
#     except Exception as e:
#         logger.exception(f"Error retrieving profile: {str(e)}")
#         raise

# def get_all_profiles():
#     try:
#         profiles = Profile.query.all()
#         if not profiles:
#             logger.info("No profiles found in the database.")
#         return [profile.to_dict() for profile in profiles]
#     except Exception as e:
#         logger.exception(f"Error retrieving all profiles: {str(e)}")
#         raise
    
import logging
from ..models import Profile
from .. import db
from sqlalchemy.exc import SQLAlchemyError

logger = logging.getLogger(__name__)

def create_or_update_profile(data):
    user_id = data.get('user_id')
    if not user_id:
        raise ValueError("user_id is required")

    try:
        profile = Profile.query.get(user_id)
        if profile:
            # Update existing profile
            for key, value in data.items():
                if hasattr(profile, key):
                    setattr(profile, key, value)
        else:
            # Create new profile
            profile = Profile(**data)
            db.session.add(profile)

        db.session.commit()
        return profile.to_dict()
    except Exception as e:
        if db.session.is_active:
            db.session.rollback()
        logger.exception(f"Error saving profile: {str(e)}")
        raise

def get_profile(user_id):
    try:
        profile = Profile.query.filter_by(user_id=user_id).first()
        if profile:
            return profile.to_dict()
        else:
            logger.info(f"No profile found for user_id: {user_id}")
            return None
    except Exception as e:
        logger.exception(f"Error retrieving profile: {str(e)}")
        raise

def get_all_profiles():
    try:
        profiles = Profile.query.all()
        if not profiles:
            logger.info("No profiles found in the database.")
        return [profile.to_dict() for profile in profiles]
    except Exception as e:
        logger.exception(f"Error retrieving all profiles: {str(e)}")
        raise