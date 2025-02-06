import numpy as np

# Haversine function ....used to calculate the distance 
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in km
    dlat = np.radians(lat2 - lat1)
    dlon = np.radians(lon2 - lon1)
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    return R * c

# Function to find the nearest volunteer
def find_nearest_volunteer(victim, volunteers, crisis_locations):
    # Predefined crisis locations with levels
    crisis_locations = [
    {"name": "Location 1", "lat": 19.0760, "lon": 72.8777, "crisis_level": 8},
    {"name": "Location 2", "lat": 19.2000, "lon": 72.8500, "crisis_level": 9},
    {"name": "Location 3", "lat": 19.1500, "lon": 72.7500, "crisis_level": 7},
    {"name": "Location 4", "lat": 19.0225, "lon": 72.8570, "crisis_level": 10},
    ]
    # List of volunteers
    volunteers = [
    {"name": "Celene Ciby", "lat": 19.0750, "lon": 72.8770, "phone": "7898005643"},
    {"name": "Grace Lancaster", "lat": 19.1000, "lon": 72.8500, "phone": "9067558932"},
    {"name": "Avery Grambs", "lat": 19.0500, "lon": 72.7500, "phone": "8809345267"}
    
    ]
    # Victim information (this could be dynamic from your DB)
    victims = [
    {"name": "Freia Quadros", "lat": 19.0730, "lon": 72.8775, "priority": 9},
    {"name": "Kumar Verma", "lat": 19.2000, "lon": 72.8505, "priority": 7},
    ]
    
    nearest_volunteer = None
    min_distance = float('inf')
    max_crisis_level = -1
    
    # Iterate over crisis locations
    for crisis_location in crisis_locations:
        distance_to_crisis = haversine(victim["lat"], victim["lon"], crisis_location["lat"], crisis_location["lon"])

        # Check if victim's priority matches crisis level
        if victim["priority"] >= crisis_location["crisis_level"]:
            # Find the nearest volunteer
            for volunteer in volunteers:
                distance_to_volunteer = haversine(crisis_location["lat"], crisis_location["lon"], volunteer["lat"], volunteer["lon"])

                if distance_to_volunteer < min_distance or (distance_to_volunteer == min_distance and crisis_location["crisis_level"] > max_crisis_level):
                    nearest_volunteer = volunteer
                    min_distance = distance_to_volunteer
                    max_crisis_level = crisis_location["crisis_level"]

    return nearest_volunteer, min_distance, max_crisis_level

