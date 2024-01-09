from flask import Flask, render_template
import webbrowser
import sys
import subprocess
import threading

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

def run_server(port):
    app.run(port=port, host="0.0.0.0")

if __name__ == "__main__":
    try:
        port = int(sys.argv[1])
    except IndexError:
        print("Using default port 5000.")
        port = 5000

    #server_thread = threading.Thread(target=lambda:run_server(port))
    #server_thread.daemon = True
    #server_thread.start()

    # url = f"http://localhost:{port}"
    # subprocess.call(["cmd.exe", "/c", "start", url])

    app.run(port=port, host="0.0.0.0")
