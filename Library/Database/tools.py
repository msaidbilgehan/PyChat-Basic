
from Library import db, app, global_logger
from Library.Database.models import User

import os

from sqlalchemy.engine import reflection



def initialize_database(path: str = "chat_app.db") -> bool:
    if not os.path.exists(path):
        global_logger.info("DB file not found. Creating a new one.")
        with app.app_context():
            db.create_all()
        global_logger.info("DB file created.")
        return True
    else:
        global_logger.info("DB file found.")
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


def check_user(email: str, username: str, password: str) -> bool:
    if User.query.filter_by(username=username).first() is not None:
        return False

    user = User(
        username=username,
        email=email
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()
    return True

