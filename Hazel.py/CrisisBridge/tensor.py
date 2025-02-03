import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import numpy as np

#the dataset 
#Priority(0 = Low,1Medium,2=High)
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

#Normalize the data
data = data / np.max(data, axis=0)

#Define the model
model = Sequential([
    Dense(16, input_shape=(3,), activation='relu'),  # Input layer
    Dense(16, activation='relu'),                   # Hidden layer
    Dense(3, activation='softmax')                  # Output layer(3 classes:Low,Medium,High)
])

#Compile
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

#Train the model
model.fit(data, labels, epochs=100, verbose=0)

#Test
test_data = np.array([[6, 100, 60]])
test_data = test_data / np.max(data, axis=0)

prediction = model.predict(test_data)
priority = np.argmax(prediction)

priority_labels = {0: "Low Priority", 1: "Medium Priority", 2: "High Priority"}
print(f"Predicted Priority: {priority_labels[priority]}")



