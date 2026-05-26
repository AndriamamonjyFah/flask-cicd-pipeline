import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    return app.test_client()

def test_index(client):
    r = client.get('/')
    assert r.status_code == 200

def test_about(client):
    r = client.get('/about')
    assert r.status_code == 200

def test_health(client):
    r = client.get('/health')
    assert r.status_code == 200
