#__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Enable CORS for all routes and specify the allowed origins
    # CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:5000"]}})
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
    CORS(app, resources={r"/*": {"origins": "http://localhost:5000", "supports_credentials": True}})
    
    

    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    from .routes.auth import bp as auth_bp
    from .routes.profile import bp as profile_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(profile_bp, url_prefix='/profile')
    
    
    return app