import tensorflow as tf
import numpy as np
import os

# Data Preparation (Priority: 0 = Low, 1 = Medium, 2 = High)
data = np.array([
    [3, 10, 20],  # Low priority
    [5, 50, 40],  # Medium priority
    [9, 200, 80], # High priority
    [4, 30, 25],  # Medium priority
    [8, 150, 90], # High priority
    [2, 5, 10],   # Low priority
    [7, 120, 70], # High priority
    [5, 45, 35]   # Medium priority
])

labels = np.array([0, 1, 2, 1, 2, 0, 2, 1])  # Priority labels

# Normalize the data
data = data / np.max(data, axis=0)

# Load the trained model (including architecture and weights)
def load_model():
    print("Loading model...")
    if os.path.exists('models/tensor.h5'):
        return tf.keras.models.load_model('models/tensor.h5')
    else:
        print("Model file not found. Creating and saving a new model...")
        train_and_save_model()
        return tf.keras.models.load_model('models/tensor.h5')

# Train and save the model if it doesn't exist
def train_and_save_model():
    model = tf.keras.models.Sequential([
        tf.keras.layers.Dense(16, input_shape=(3,), activation='relu'),  # Input layer
        tf.keras.layers.Dense(16, activation='relu'),                   # Hidden layer
        tf.keras.layers.Dense(3, activation='softmax')                  # Output layer (3 classes: Low, Medium, High)
    ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    model.fit(data, labels, epochs=100, verbose=0)
    model.save("models/tensor.h5")

# Make a prediction using the trained model
def predict_priority(features):
    model = load_model()  # Load the complete model
    prediction = model.predict(np.array(features).reshape(1, -1))
    print(f"Prediction output (probabilities): {prediction}")
    return prediction

# Test the prediction function
test_data = np.array([[6, 100, 60]])  # Sample test data
test_data = test_data / np.max(data, axis=0)  # Normalize the test data using max of training data

# Get the prediction
prediction = predict_priority(test_data)
priority = np.argmax(prediction)  # Get the class with the highest probability

# Map the priority label to human-readable form
priority_labels = {0: "Low Priority", 1: "Medium Priority", 2: "High Priority"}
print(f"Predicted Priority: {priority_labels[priority]}")


