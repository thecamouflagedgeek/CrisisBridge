import numpy as np

# Haversine function ....used to calculate the distance 
def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = np.radians(lat2 - lat1)
    dlon = np.radians(lon2 - lon1)
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    return R * c

#A list of predefined crisis levels and locations in Mumbai
crisis_locations = [
    {"name": "Location 1", "lat": 19.0760, "lon": 72.8777, "crisis_level": 8},  #someplace
    {"name": "Location 2", "lat": 19.2000, "lon": 72.8500, "crisis_level": 9},  #mumbaiii
    {"name": "Location 3", "lat": 19.1500, "lon": 72.7500, "crisis_level": 7},  #bandraaa
    {"name": "Location 4", "lat": 19.0225, "lon": 72.8570, "crisis_level": 10}, #goregaonn
]

#list of NGOs
ngos = [
    {"name": "NGO A", "lat": 19.0750, "lon": 72.8770, "capacity": 50},
    {"name": "NGO B", "lat": 19.1000, "lon": 72.8500, "capacity": 40},
    {"name": "NGO C", "lat": 19.0500, "lon": 72.7500, "capacity": 30},
]

#Victim information
victims = [
    {"name": "Victim 1", "lat": 19.0730, "lon": 72.8775, "priority": 9},  # High priority victim
    {"name": "Victim 2", "lat": 19.2000, "lon": 72.8505, "priority": 7},  # Medium priority victim
]

# Function to find the nearest NGO
def find_nearest_ngo(victim, ngos, crisis_locations):
    nearest_ngo = None
    min_distance = float('inf')
    max_crisis_level = -1
    
    #predefined crisis locations
    for crisis_location in crisis_locations:
        distance_to_crisis = haversine(victim["lat"], victim["lon"], crisis_location["lat"], crisis_location["lon"])
        
        #the victim's priority matches
        if victim["priority"] >= crisis_location["crisis_level"]:
            # Find the nearest NGO
            for ngo in ngos:
                distance_to_ngo = haversine(crisis_location["lat"], crisis_location["lon"], ngo["lat"], ngo["lon"])
                
                # Update if NGO is closer and the crisis level is higher
                if distance_to_ngo < min_distance and crisis_location["crisis_level"] > max_crisis_level:
                    nearest_ngo = ngo
                    min_distance = distance_to_ngo
                    max_crisis_level = crisis_location["crisis_level"]
                    
    return nearest_ngo, min_distance, max_crisis_level

#the nearest NGO
for victim in victims:
    nearest_ngo, distance, crisis_level = find_nearest_ngo(victim, ngos, crisis_locations)
    if nearest_ngo:
        print(f"Victim: {victim['name']}")
        print(f"Nearest NGO: {nearest_ngo['name']}")
        print(f"Distance: {distance:.2f} km")
        print(f"Crisis Level at Location: {crisis_level}")
        print(f"NGO Capacity: {nearest_ngo['capacity']}")
        print("---------")
    else:
        print(f"No suitable NGO found for {victim['name']}.")
        print("---------")

