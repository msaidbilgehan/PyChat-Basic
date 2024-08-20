
import json
import logging
from logging.handlers import RotatingFileHandler
import sys



# def aware_utcnow():
#     return datetime.now(timezone.utc)

# def naive_utcnow():
#     return aware_utcnow().replace(tzinfo=None)

def secret_generator(length: int = 32) -> str:
    import secrets
    import string
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*()_+-="
    return ''.join(secrets.choice(alphabet) for i in range(length))

def create_Logger(name: str, path: str = "", level_stdo: int = logging.DEBUG, level_file: int = logging.DEBUG, mode="a", maxBytes=5*1024*1024, backupCount=2) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    stdout_formatter = logging.Formatter(
        '%(levelname)s | %(name)s | %(message)s'
    )
    file_formatter = logging.Formatter(
        '%(asctime)s | %(levelname)s | %(name)s | %(message)s',
        '%m-%d-%Y %H:%M:%S'
    )

    stdout_handler = logging.StreamHandler(sys.stdout)
    stdout_handler.setLevel(level_stdo)
    stdout_handler.setFormatter(stdout_formatter)
    logger.addHandler(stdout_handler)

    if path:
        try:
            file_handler = RotatingFileHandler(
                path, mode=mode, maxBytes=maxBytes, backupCount=backupCount
            )
            file_handler.setLevel(level_file)
            file_handler.setFormatter(file_formatter)

            logger.addHandler(file_handler)
        except Exception as e:
            logger.error(f"Error while creating file handler: {e}")
    return logger


def readJsonFile(path):
    try:
        with open(path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"File Can Not be found: {path}")
        return {}
    except json.JSONDecodeError:
        print(f"Corrupt JSON File: {path}")
        return {}
    except Exception as Error:
        print(f"Error Occurred '{path}' -> {Error}")
        return {}


def saveJsonFile(path: str, data: dict) -> bool:
    try:
        with open(path, 'w') as file:
            json.dump(data, file, indent=4)
            print("Settings have been saved successfully.")
        return True
    except IOError:
        print(f"Error writing to the file: {path}")
        return False
    except Exception as Error:
        print(f"Error Occurred '{path}' -> {Error}")
        return False
