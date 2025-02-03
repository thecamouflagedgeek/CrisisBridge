from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello from CrisisBridge!"

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/api', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"received_data": data})

@app.route('/victim',methods=['GET'])
def victimget():
    return jsonify({"message":"VICTIM SIGNUP"})

@app.route('/volunteer',methods = ['GET'])
def volunteerget():
    return jsonify({"message":"VOLUNTEER SIGNUP"})

@app.route('/vm',methods=['POST'])
def victim():
    data=request.json
    return jsonify({"received_data":data})

@app.route('/vltr',methods=['POST'])
def volunteer():
    data=request.json
    return jsonify({"received_data":data})

if __name__ == '__main__':
    app.run(debug=True)
