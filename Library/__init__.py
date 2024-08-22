
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from Library.Configurations.paths import DIR_FOLDER_TEMPLATE, DIR_FOLDER_STATIC, DIR_FOLDER_PUBLIC_FILES, DIR_FILE_LOGS_GENERAL, DIR_FILE_DB
from Library.Configurations.environment import SECRET_KEY, JWT_SECRET_KEY
from Library.Scripts.tools import create_Logger
from Library.Database.models import User, MessageLog

from flask import Flask
# from flask_cors import CORS
from flask_socketio import SocketIO
import logging

##########
# LOGGER #
##########
print(f"Logger initializing with the following path: {DIR_FILE_LOGS_GENERAL}")
global_logger = create_Logger(
    name="global_logger",
    level_stdo=logging.DEBUG,
    level_file=logging.DEBUG,
    path=DIR_FILE_LOGS_GENERAL,
    backupCount=3
)
global_logger.info("Logger initialized.")


#########
# FLASK #
#########

app = Flask(
    __name__,
    template_folder=DIR_FOLDER_TEMPLATE,
    static_folder=DIR_FOLDER_STATIC
)
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY  # Use a secure, random key
app.config['SECRET_KEY'] = SECRET_KEY

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DIR_FILE_DB}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS stands for Cross-Origin Resource Sharing, and it is a mechanism that allows web browsers to make requests
# to a different domain than the one the web page originated from.
# This is an important security feature implemented by web browsers to prevent malicious scripts from accessing sensitive data.
# It is important to configure CORS properly to ensure the security and integrity of your application's resources.
# Comment out the below line if only necessary.
# CORS(app)
# CORS(app, origins=["https://<DOMAIN>:<PORT>"])

app.config['UPLOAD_FOLDER'] = DIR_FOLDER_PUBLIC_FILES


###############
# SQL Alchemy #
###############
db = SQLAlchemy(app)
with app.app_context():
    db.create_all()  # Creates all tables defined in your models

#######
# JWT #
#######
jwt = JWTManager(app)

#############
# SOCKET IO #
#############
socketio = SocketIO(
    app=app,
    # PyInstaller works with 'threading', but not with 'eventlet'.
    # Or at least need to add hiddenimports=['engineio.async_drivers.eventlet'] in the spec file.
    async_mode='threading',
    # async_mode='eventlet',
    # cors_allowed_origins="*",
    # manage_session=False,
    # always_connect=True,
)

##########
# Routes #
##########
from Library.Routes import pages, apis