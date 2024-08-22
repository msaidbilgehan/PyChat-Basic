from Library import app, global_logger

from flask import render_template, redirect, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request

#############
### PAGES ###
#############


@app.route('/', methods=['GET', 'POST'])
def page_index():
    try:
        # Verify JWT if present, doesn't raise error if absent
        verify_jwt_in_request(optional=True)
        current_user = get_jwt_identity()
        if current_user:
            # Redirect to chat page if user is logged in
            return redirect(url_for('page_chat'))
    except Exception as e:
        global_logger.error(f"An error occurred: {e}")
        pass  # Ignore if JWT is not present or invalid

    # Redirect to auth page if no user is logged in
    return redirect(url_for('page_auth'))


@app.route('/auth', methods=['GET', 'POST'])
def page_auth():
    return render_template('auth.html')


@app.route('/chat', methods=['GET', 'POST'])
# Commented to redirect to auth page if user is not logged in
# Uncomment to see the jwt exception and response 401
# @jwt_required()
def page_chat():
    try:
        verify_jwt_in_request(optional=True)
        current_user = get_jwt_identity()
        if current_user:
            return render_template('chat.html')
    except Exception as e:
        global_logger.error(f"An error occurred: {e}")

    return redirect(url_for('page_auth'))
