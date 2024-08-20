
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from Library.Configurations.paths import FOLDER_TEMPLATE, FOLDER_STATIC, FOLDER_PUBLIC_FILES, LOGS_GENERAL  # , DB_FILE
from Library.Configurations.environment import SECRET_KEY, JWT_SECRET_KEY
from Library.Scripts.tools import create_Logger

from flask import Flask
# from flask_cors import CORS
from flask_socketio import SocketIO
import logging

##########
# LOGGER #
##########
print(f"Logger initializing with the following path: {LOGS_GENERAL}")
global_logger = create_Logger(
    name="global_logger",
    level_stdo=logging.DEBUG,
    level_file=logging.DEBUG,
    path=LOGS_GENERAL,
    backupCount=3
)
global_logger.info("Logger initialized.")


#########
# FLASK #
#########

app = Flask(
    __name__,
    template_folder=FOLDER_TEMPLATE,
    static_folder=FOLDER_STATIC
)
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY  # Use a secure, random key
app.config['SECRET_KEY'] = SECRET_KEY

# TODO: use FILE_DB  instead of 'sqlite:///chat_app.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS stands for Cross-Origin Resource Sharing, and it is a mechanism that allows web browsers to make requests
# to a different domain than the one the web page originated from.
# This is an important security feature implemented by web browsers to prevent malicious scripts from accessing sensitive data.
# It is important to configure CORS properly to ensure the security and integrity of your application's resources.
# Comment out the below line if only necessary.
# CORS(app)
# CORS(app, origins=["https://<DOMAIN>:<PORT>"])

app.config['UPLOAD_FOLDER'] = FOLDER_PUBLIC_FILES


###############
# SQL Alchemy #
###############
db = SQLAlchemy(app)

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
