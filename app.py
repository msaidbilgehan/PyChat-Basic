from Library.Configurations.environment import HOST, PORT
from Library import app, socketio

if __name__ == "__main__":

    # Comment out if you want to open the browser automatically with the given URL.
    # Useful for development.
    # def open_browser():
    #     import webbrowser
    #     webbrowser.open_new(
    #         f"http://127.0.0.1:{PORT}"
    #     )

    # Timer(5, open_browser).start()

    print(f"Server is running on port: {PORT}")
    print("Press CTRL+C to stop the server.")
    try:
        socketio.run(
            app=app,
            host=HOST,
            port=int(PORT),
            debug=True,
            use_reloader=False,
            log_output=True,
            # To use SSL, uncomment the below line and comment the above line.
            # Check the link for more information: https://stackoverflow.com/questions/29458548/can-you-add-https-functionality-to-a-python-flask-web-server
            # ssl_context='adhoc'
        )
    except Exception as e:
        print(f"Exception: {e}")
    finally:
        print("Server is shutting down.")
        print("All done.")
