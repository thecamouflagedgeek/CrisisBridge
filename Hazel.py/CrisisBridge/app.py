from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models.tensor import predict_priority
from models.ngo import find_nearest_ngo
from models.volunteer import find_nearest_volunteer
import tensorflow as tf 
import numpy as np

priority_model = tf.keras.models.load_model("models/tensor.h5")

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

#Task table 
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    status = db.Column(db.String(20), default='Pending')

    def __repr__(self):
        return f"<Task {self.title}>"
    
@app.route('/')
def home():
    return "Hello from CrisisBridge!"

@app.route('/ap', methods=['POST'])
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

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from the POST request
    data = request.get_json()
    features = np.array(data['features'])
    features = features / np.max(features)  # Normalize the features

    # Get the prediction
    prediction = predict_priority(features)
    priority = np.argmax(prediction)  # Get the class with highest probability

    # Map the priority label to human-readable form
    priority_labels = {0: "Low Priority", 1: "Medium Priority", 2: "High Priority"}

    # Return the result as JSON
    result = {
        'predicted_priority': priority_labels[priority],
        'prediction_probabilities': prediction.tolist()
    }
    return jsonify(result)

@app.route('/allocate_ngo', methods=['POST'])
def allocate_ngo():
    # Get victim details from request body
    data = request.get_json()
    victim_name = data.get('victim_name')
    victim_lat = data.get('lat')
    victim_lon = data.get('lon')
    victim_priority = data.get('priority')

    # Search for the victim in the victims list
    victim = next((v for v in victims if v['name'] == victim_name), None)

    if victim:
        victim["lat"] = victim_lat
        victim["lon"] = victim_lon
        victim["priority"] = victim_priority

        # Call the find_nearest_ngo function from your model
        nearest_ngo, distance, crisis_level = find_nearest_ngo(victim, ngos, crisis_locations)

        if nearest_ngo:
            response = {
                "victim_name": victim_name,
                "allocated_ngo": nearest_ngo["name"],
                "distance": f"{distance:.2f} km",
                "crisis_level": crisis_level,
                "remaining_capacity": nearest_ngo["capacity"]
            }
            return jsonify(response), 200
        else:
            return jsonify({"error": "No suitable NGO found"}), 404
    else:
        return jsonify({"error": "Victim not found"}), 404

@app.route('/allocate_volunteer', methods=['POST'])
def allocate_volunteer():
    # Get victim details from request body
    data = request.get_json()
    victim_name = data.get('victim_name')
    victim_lat = data.get('lat')
    victim_lon = data.get('lon')
    victim_priority = data.get('priority')

    # Find victim in the victim list
    victim = next((v for v in victims if v['name'] == victim_name), None)

    if victim:
        victim["lat"] = victim_lat
        victim["lon"] = victim_lon
        victim["priority"] = victim_priority

        # Call the function to find the nearest volunteer
        nearest_volunteer, distance, crisis_level = find_nearest_volunteer(victim, volunteers, crisis_locations)

        if nearest_volunteer:
            response = {
                "victim_name": victim_name,
                "allocated_volunteer": nearest_volunteer["name"],
                "distance": f"{distance:.2f} km",
                "crisis_level": crisis_level,
                "volunteer_contact": nearest_volunteer["phone"]
            }
            return jsonify(response), 200
        else:
            return jsonify({"error": "No suitable volunteer found"}), 404
    else:
        return jsonify({"error": "Victim not found"}), 404
    
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    tasks_list = [{"id": task.id, "title": task.title, "description": task.description, "status": task.status} for task in tasks]
    return jsonify({"tasks": tasks_list})

# Get single task by id
@app.route('/tsk/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get_or_404(id)
    return jsonify({"task": {"id": task.id, "title": task.title, "description": task.description, "status": task.status}})

@app.route('/tsk', methods=['POST'])
def create_task():
    data = request.get_json()
    new_task = Task(
        title=data['title'],
        description=data.get('description', ''),
        status=data.get('status', 'Pending')
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created successfully", "task": data}), 201

@app.route('/t/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)

    db.session.commit()
    return jsonify({"message": "Task updated successfully", "task": {"id": task.id, "title": task.title, "description": task.description, "status": task.status}})

# Delete task endpoint
@app.route('/ts/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"})

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)


