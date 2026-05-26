from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['APP_NAME'] = os.getenv('APP_NAME', 'flask-cicd-pipeline')
    app.config['APP_VERSION'] = os.getenv('APP_VERSION', '1.0.0')
    app.config['BUILD_DATE'] = os.getenv('BUILD_DATE', 'N/A')

    from .routes import main
    app.register_blueprint(main)
    return app
