from Library.Classes.module_logger import ModuleLogger

import unittest


class TestModuleLogger(unittest.TestCase):

    def setUp(self):
        # Set up any state that is shared across tests
        self.module_logger_instance = ModuleLogger(self.__class__.__name__)
        self.logger_instance = self.module_logger_instance.get_Logger()

    def test_logging(self):
        # You can capture the logging output if necessary
        self.logger_instance.info("info")
        self.logger_instance.warning("warning")
        self.logger_instance.error("error")
        self.logger_instance.debug("Debug")
        self.logger_instance.critical("critical")
        self.logger_instance.fatal("fatal")



if __name__ == '__main__':
    unittest.main()
