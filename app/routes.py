from flask import Blueprint, jsonify, render_template, current_app

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html',
        app_name=current_app.config['APP_NAME'],
        version=current_app.config['APP_VERSION'],
    )

@main.route('/about')
def about():
    return render_template('about.html',
        app_name=current_app.config['APP_NAME'],
        version=current_app.config['APP_VERSION'],
        build_date=current_app.config['BUILD_DATE'],
    )

@main.route('/health')
def health():
    import datetime
    return render_template('health.html',
        app_name=current_app.config['APP_NAME'],
        version=current_app.config['APP_VERSION'],
        checked_at=datetime.datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC'),
    )
