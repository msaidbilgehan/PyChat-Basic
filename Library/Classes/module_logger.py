
import logging
from os import listdir

from Library.Scripts.tools import create_Logger



class ModuleLogger():
    def __init__(
        self,
        logger_name: str = "",
        logger_file_path: str = "",
        logger=None,
        logger_level_stdo: int = logging.DEBUG,
        logger_level_file: int = logging.DEBUG,
        mode="a",
        maxBytes=5*1024*1024,
        backupCount=2,
        *args, **kwargs
    ):
        super(ModuleLogger, self).__init__(*args, **kwargs)

        self.logger_file_path = logger_file_path

        if logger is None:
            if logger_name == "":
                logger_name = self.__class__.__name__

            self.logger = create_Logger(
                name=logger_name,
                path=self.logger_file_path,
                level_stdo=logger_level_stdo,
                level_file=logger_level_file,
                mode=mode,
                maxBytes=maxBytes,
                backupCount=backupCount
            )
        else:
            self.logger = logger

    def get_Logger(self) -> logging.Logger:
        return self.logger

    def set_Logger(self, logger: logging.Logger):
        self.logger = logger

    def get_Logs(self):
        splitted_path_name = self.logger_file_path.split("/")
        root_path_log = "/".join(splitted_path_name[:-1])
        log_file_name = splitted_path_name[-1]
        return [root_path_log + "/" + i for i in listdir(root_path_log) if log_file_name in i]
