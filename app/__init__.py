from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
import os

# Initialize extensions
db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    Migrate(app, db)

    # Register blueprints
    from app.routes.flights import flights_bp
    from app.routes.users import users_bp
    from app.routes.bookings import bookings_bp
    app.register_blueprint(flights_bp, url_prefix="/flights")
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(bookings_bp, url_prefix="/bookings")

    return app
