import os

from flask import Flask
from flask_cors import CORS

from config import config as Config
from models import db

basedir = os.path.abspath(os.path.dirname(__file__))


def create_app(config):
    app = Flask(__name__)
    config_name = config

    if not isinstance(config, str):
        config_name = os.getenv('FLASK_CONFIG', 'development')

    app.config.from_object(Config[config_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    Config[config_name].init_app(app)

    # Set up extensions
    db.init_app(app)
    CORS(app)

    # create app blueprints
    from main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    # create product blueprints
    from products.api import products_blueprint
    app.register_blueprint(products_blueprint)

    # create notification blueprints
    from notifications.api import notification_blueprint
    app.register_blueprint(notification_blueprint)

    return app
