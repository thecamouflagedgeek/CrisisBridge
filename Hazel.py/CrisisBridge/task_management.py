# task_management.py

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:sirius*@localhost/crisis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    status = db.Column(db.String(20), default='Pending')  # e.g., 'Pending', 'Completed'

    def __repr__(self):
        return f"<Task {self.title}>"

# Create task endpoint
@app.route('/tasks', methods=['POST'])
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

# Get all tasks endpoint
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    tasks_list = [{"id": task.id, "title": task.title, "description": task.description, "status": task.status} for task in tasks]
    return jsonify({"tasks": tasks_list})

# Get single task by id
@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get_or_404(id)
    return jsonify({"task": {"id": task.id, "title": task.title, "description": task.description, "status": task.status}})

# Update task endpoint
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.get_json()

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)

    db.session.commit()
    return jsonify({"message": "Task updated successfully", "task": {"id": task.id, "title": task.title, "description": task.description, "status": task.status}})

# Delete task endpoint
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"})

if __name__ == "__main__":
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
    app.run(debug=True)
