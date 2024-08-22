
from Library import db, app, global_logger
from Library.Database.models import User

import os

from sqlalchemy.engine import reflection


def initialize_database(path: str = "", name: str = "chat_app.db") -> bool:
    db_path = os.path.join(path, name)  # Full path to the database file

    # Ensure the directory exists
    if not os.path.exists(path):
        global_logger.info(f"Directory for DB not found. Creating a new one at {path}")
        os.makedirs(path, exist_ok=True)  # Use exist_ok=True to avoid throwing an error if the directory exists

    # Check if the database file exists
    if not os.path.exists(db_path):
        global_logger.info(f"DB file not found. Creating a new one at {db_path}")

        # Setting the SQLALCHEMY_DATABASE_URI to point to the specific path
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
        with app.app_context():
            db.create_all()  # Creates all tables defined in your models

        global_logger.info("DB file created.")
        return True
    else:
        global_logger.info("DB file already exists.")
        return False



def check_tables(table_names: list) -> bool:
    """Check for the necessary tables in the database and create them if not present."""
    try:
        with app.app_context():
            inspector = reflection.Inspector.from_engine(db.engine)
            missing_tables = [
                table for table in table_names if
                table not in inspector.get_table_names()
            ]
            if missing_tables:
                global_logger.info(f"Missing tables: {missing_tables}")
                for table in missing_tables:
                    db.metadata.tables[table].create(bind=db.engine)
                global_logger.info("Necessary tables were created.")
                return True
            else:
                global_logger.info("Necessary tables were found.")
                return False
    except Exception as e:
        global_logger.error(
            f"An error occurred while checking or creating tables: {e}")
        return False


def check_and_create_user(email: str, username: str, password: str) -> bool:
    if User.query.filter_by(username=username).first() is not None:
        return False

    user = User(
        username=username,  # type: ignore
        email=email  # type: ignore
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()
    return True


def authenticate_user(username, password):
    user = User.query.filter_by(username=username).first()
    if user is not None and user.check_password(password):
        return user
    return None
