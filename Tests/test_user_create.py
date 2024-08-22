import pytest
from Library import app, db
from Library.Database.models import User

@pytest.fixture
def app():
    with app.app_context():
        db.create_all()
    yield app
    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


def test_new_user(client):
    """Kullanıcı oluşturma testi."""
    response = client.post('/signup', json={
        'username': 'testuser',
        'email': 'test@example.com',
        'password': 'securepassword'
    })
    assert response.status_code == 201
    assert User.query.count() == 1
