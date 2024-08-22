

#########
# PATHS #
#########

import os


DIR_ROOT = os.path.dirname("/".join(os.path.abspath(__file__).split("/")[:-2]))

DIR_FOLDER_TEMPLATE = os.path.join(DIR_ROOT, 'template')
DIR_FOLDER_STATIC = os.path.join(DIR_ROOT, 'assets')

DIR_FOLDER_WORKING = os.path.join(DIR_ROOT, 'files')
if not os.path.exists(DIR_FOLDER_WORKING):
    os.makedirs(DIR_FOLDER_WORKING)

DIR_FOLDER_DB = os.path.join(DIR_FOLDER_WORKING, 'Database')
DIR_FOLDER_PUBLIC_FILES = os.path.join(DIR_FOLDER_WORKING, 'public')
DIR_FOLDER_LOGS = os.path.join(DIR_FOLDER_WORKING, 'logs')

if not os.path.exists(DIR_FOLDER_DB):
    os.makedirs(DIR_FOLDER_DB)

if not os.path.exists(DIR_FOLDER_LOGS):
    os.makedirs(DIR_FOLDER_LOGS)

if not os.path.exists(DIR_FOLDER_PUBLIC_FILES):
    os.makedirs(DIR_FOLDER_PUBLIC_FILES)

#########
# FILES #
#########

# LOGS
DIR_FILE_LOGS_GENERAL = os.path.join(DIR_FOLDER_LOGS, 'general.log')

# Database
DIR_FILE_DB = os.path.join(DIR_FOLDER_DB, 'chat_app.db')
