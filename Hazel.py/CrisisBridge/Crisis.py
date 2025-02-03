from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sirius*@localhost/crisis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
db = SQLAlchemy(app)

# Victim Table
class Victim(db.Model):
    __tablename__ = 'victims'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Victim {self.name}>'

# Volunteer Table
class Volunteer(db.Model):
    __tablename__ = 'volunteer'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    address = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Volunteer {self.name}>'

# NGO Table
class NGO(db.Model):
    __tablename__ = 'ngos'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    location = db.Column(db.Text, nullable=False)
    services = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<NGO {self.name}>'

# Crisis Table
class Crisis(db.Model):
    __tablename__ = 'crises'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.Text, nullable=False)
    severity = db.Column(db.Integer, nullable=False)  # 1 to 5 scale
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f'<Crisis {self.description}>'

# NGO Allocations Table
class NGOAllocation(db.Model):
    __tablename__ = 'ngo_allocations'
    id = db.Column(db.Integer, primary_key=True)
    priority = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='Pending')

    def __repr__(self):
        return f'<NGOAllocation {self.id}>'

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

# Victim Signup - GET
@app.route('/victim', methods=['GET'])
def victimget():
    return jsonify({"message": "VICTIM SIGNUP"})

# Volunteer Signup - GET
@app.route('/volunteer', methods=['GET'])
def volunteerget():
    return jsonify({"message": "VOLUNTEER SIGNUP"})

# Victim Signup - POST
@app.route('/vm', methods=['POST'])
def victim():
    data = request.json
    new_victim = Victim(name=data['name'], age=data['age'],phone=data['phone'],address=data['address'])
    db.session.add(new_victim)
    db.session.commit()
    return jsonify({"message": "Victim added successfully", "received_data": data})

# Volunteer Signup - POST
@app.route('/vltr', methods=['POST'])
def volunteer():
    data = request.json
    new_volunteer= Volunteer(name=data['name'], age=data['age'],phone=data['phone'],address=data['address'])
    db.session.add(new_volunteer)
    db.session.commit()
    return jsonify({"received_data": data})

# NGO Signup - POST
@app.route('/ngo', methods=['POST'])
def ngo():
    data = request.json
    new_ngo = NGO(name=data['name'],phone=data['phone'],email=data['email'],location=data['location'], services=data['services'])
    db.session.add(new_ngo)
    db.session.commit()
    return jsonify({"message": "Registered successfully", "received_data": data})

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)

