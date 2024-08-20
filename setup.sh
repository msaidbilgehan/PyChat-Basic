#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "$DIR/venv/bin/activate"
export FLASK_APP=app.py
export FLASK_ENV=production
flask run
