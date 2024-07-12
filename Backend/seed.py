# seed_database.py

from flask import Flask
from flask_bcrypt import Bcrypt
from app.models import db, User, Profile
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wink.db'  # Replace with your actual database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

bcrypt = Bcrypt(app)
db.init_app(app)

def seed_users():
    with app.app_context():
        # Create tables (if they don't exist already)
        db.create_all()

        # Example data for user profiles
        users_data = [
            {
                'username': 'zara21',
                'email': 'zara21@example.com',
                'password': bcrypt.generate_password_hash('password').decode('utf-8'),
                'gender': 'female',
                'profile': {
                    'name': 'Zara',
                    'age': 21,
                    'gender': 'female',
                    'occupation': 'Marketing Assistant',
                    'bio': 'Creative soul with a passion for social media and brand awareness.',
                    'photos': '../Backend/Assets/Ladies/12.jpeg',
                    'preferences': 'male',
                    'hobbies': 'Taking selfies, binge-watching Netflix, yoga'
                }
            },
            {
                'username': 'maya23',
                'email': 'maya23@example.com',
                'password': bcrypt.generate_password_hash('password').decode('utf-8'),
                'gender': 'female',
                'profile': {
                    'name': 'Maya',
                    'age': 23,
                    'gender': 'female',
                    'occupation': 'Junior Software Developer',
                    'bio': 'Tech enthusiast learning to code and build cool apps.',
                    'photos': '../Backend/Assets/Ladies/13.jpeg',
                    'preferences': 'male',
                    'hobbies': 'Gaming, cosplay, learning new programming languages'
                }
            },
             {
                'username': 'pyt',
                'email': 'pyt23@example.com',
                'password': bcrypt.generate_password_hash('wordpass').decode('utf-8'),
                'gender': 'female',
                'profile': {
                    'name': 'Natasha',
                    'age': 23,
                    'gender': 'female',
                    'occupation': 'Junior Software Developer',
                    'bio': 'Tech enthusiast learning to code and build cool apps.',
                    'photos': 'https://images.unsplash.com/photo-1521033719794-41049d18b8d4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    'preferences': 'male',
                    'hobbies': 'Gaming, cosplay, learning new programming languages'
                }
            },
              {
                'username': 'aaliyah',
                'email': 'aaliyah@example.com',
                'password': bcrypt.generate_password_hash('capslock').decode('utf-8'),
                'gender': 'female',
                'profile': {
                    'name': 'Aaliyah',
                    'age': 21,
                    'gender': 'female',
                    'occupation': 'Junior Software Developer',
                    'bio': 'Tech enthusiast learning to code and build cool apps.',
                    'photos': '/Backend/Assets/Ladies/1.jpeg',
                    'preferences': 'male',
                    'hobbies': 'Gaming, cosplay, learning new programming languages'
                }
            },
        ]

           # Seed users and profiles
        for user_data in users_data:
            existing_user = User.query.filter_by(email=user_data['email']).first()
            if not existing_user:
                # Create User object
                user = User(
                    username=user_data['username'],
                    email=user_data['email'],
                    password=user_data['password'],
                    gender=user_data['gender'],
                )
                db.session.add(user)
                db.session.commit()

                # Create Profile object associated with the user
                profile_data = user_data['profile']
                profile = Profile(
                    user_id=user.id,
                    name=profile_data['name'],
                    age=profile_data['age'],
                    gender=profile_data['gender'],
                    occupation=profile_data['occupation'],
                    bio=profile_data['bio'],
                    preferences=profile_data['preferences'],
                    hobbies=profile_data['hobbies']
                )

                if 'photos' in profile_data:
                    profile.photos = profile_data['photos']
                elif 'videos' in profile_data:
                    profile.videos = profile_data['videos']

                db.session.add(profile)
                db.session.commit()

        print("Database seeded successfully!")
                
if __name__ == '__main__':
    seed_users()

# import bcrypt
# from random import randint, choice
# from flask import Flask
# from flask_bcrypt import Bcrypt
# from app.models import db, User, Profile
# from datetime import datetime

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wink.db'  # Replace with your actual database URI
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# bcrypt = Bcrypt(app)
# db.init_app(app)


# occupations = [
#     'Software Developer', 'Teacher', 'Nurse', 'Marketing Specialist',
#     'Graphic Designer', 'Financial Analyst', 'Chef', 'Photographer',
#     'Lawyer', 'Architect', 'Journalist', 'Makeup Artists', 'Gym'
# ]

# hobbies = [
#     'Reading', 'Hiking', 'Cooking', 'Photography', 'Painting',
#     'Playing guitar', 'Yoga', 'Traveling', 'Gaming', 'Gardening'
# ]

# def generate_bio():
#     return choice([
#         "Adventurous spirit seeking new experiences.",
#         "Coffee enthusiast and book lover.",
#         "Passionate about fitness and healthy living.",
#         "Creative mind with a love for art and music.",
#         "Tech geek and outdoor adventurer."
#     ])

# users_data = [
#     {
#         'username': 'zara21',
#         'email': 'zara21@example.com',
#         'password': bcrypt.generate_password_hash('password').decode('utf-8'),
#         'gender': 'female',
#         'profile': {
#             'name': 'Zara',
#             'age': 21,
#             'gender': 'female',
#             'occupation': choice(occupations),
#             'bio': generate_bio(),
#             'photos': 'Backend/Assets/Ladies/12.jpeg',
#             'preferences': 'male',
#             'hobbies': ', '.join(choice(hobbies) for _ in range(3))
#         }
#     },
#     # Add more users here...
# ]

# # Function to generate additional users
# def generate_user(index):
#     genders = ['male', 'female']
#     gender = choice(genders)
#     opposite_gender = 'female' if gender == 'male' else 'male'
    
#     return {
#         'username': f'user{index}',
#         'email': f'user{index}@example.com',
#         'password': bcrypt.generate_password_hash('password').decode('utf-8'),
#         'gender': gender,
#         'profile': {
#             'name': f'User {index}',
#             'age': randint(18, 40),
#             'gender': gender,
#             'occupation': choice(occupations),
#             'bio': generate_bio(),
#             'photos': f'Backend/Assets/{"Gents" if gender == "male" else "Ladies"}/{index}.jpeg',
#             'preferences': opposite_gender,
#             'hobbies': ', '.join(choice(hobbies) for _ in range(3))
#         }
#     }

# # Generate additional users (for example, 19 more to have a total of 20)
# for i in range(2, 21):  # Start from 2 because we already have one user
#     users_data.append(generate_user(i))

# # Now users_data contains 20 users with varied data
