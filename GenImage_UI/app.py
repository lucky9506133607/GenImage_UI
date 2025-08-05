from flask import Flask, render_template, request, jsonify
from testCases.LinkeChecker import run_link_check  # assuming linkcheck.py is in same dir

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/run-linkcheck', methods=['POST'])
def run_linkcheck_route():
    payload = request.json or {}
    url = payload.get("url", "").strip()
    if not url:
        return jsonify({"status": "error", "message": "Missing 'url' parameter."}), 400
    if not (url.startswith("http://") or url.startswith("https://")):
        return jsonify({"status": "error", "message": "URL must start with http:// or https://"}), 400

    result = run_link_check(url)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)







""" 
 
================================ OLD File ==============================
print("app.py is running!")
from flask import Flask, render_template, request, jsonify
from testCases.LinkeChecker import run_link_check  # assuming linkcheck.py is in same dir

import os

app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    print("Received data:", data)
    # You can process data here
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
    
    
"""