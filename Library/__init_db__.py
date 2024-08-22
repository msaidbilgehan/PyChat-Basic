from Library.Configurations.paths import DIR_FILE_DB
from Library.Database.tools import initialize_database
from Library.Database.models import User, MessageLog

initialize_database(
    path=DIR_FILE_DB
)
