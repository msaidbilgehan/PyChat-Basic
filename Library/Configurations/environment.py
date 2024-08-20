

import os
from Library.Scripts.tools import secret_generator


HOST = os.environ.get("APP_HOST", "0.0.0.0")
PORT = os.environ.get("APP_PORT", "5005")
SECRET_KEY = os.environ.get('SECRET_KEY', secret_generator())
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', secret_generator())
