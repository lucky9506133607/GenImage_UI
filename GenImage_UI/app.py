print("app.py is running!")
from flask import Flask, render_template, request, jsonify
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