

#########
# PATHS #
#########

import os


FOLDER_WORKING = 'files'
if not os.path.exists(FOLDER_WORKING):
    os.makedirs(FOLDER_WORKING)

FOLDER_DB = os.path.join(FOLDER_WORKING, 'Database')
if not os.path.exists(FOLDER_DB):
    os.makedirs(FOLDER_DB)

FOLDER_TEMPLATE = "template"
FOLDER_STATIC = "static"
FOLDER_PUBLIC_FILES = "files/public"
FOLDER_LOGS = os.path.join(FOLDER_WORKING, 'logs')

if not os.path.exists(FOLDER_LOGS):
    os.makedirs(FOLDER_LOGS)

if not os.path.exists(FOLDER_PUBLIC_FILES):
    os.makedirs(FOLDER_PUBLIC_FILES)

#########
# FILES #
#########

# LOGS
LOGS_GENERAL = os.path.join(FOLDER_LOGS, 'general.log')

# Database
DB_FILE = os.path.join(FOLDER_DB, 'chat_app.db')
