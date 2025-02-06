import React, { useEffect, useState } from 'react';
import GoogleMap from './GoogleMap';
import styles from './Dashboard.module.css';

const assignedVolunteers = [
  "Volunteer A",
  "Volunteer B",
  "Volunteer C",
  "Volunteer D",
];

const Victim_dashboard: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1>Victim Dashboard</h1>
      <div className={styles.glassCard}>
        {/* Google Map Section */}
        <div className={styles.mapContainer}>
          {location ? (
            <GoogleMap location={location} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>

        {/* Volunteers List Section */}
        <div className={styles.cardContent}>
          <h2>Assigned Volunteers</h2>
          <ul className={styles.volunteerList}>
            {assignedVolunteers.map((volunteer, index) => (
              <li key={index} className={styles.volunteerItem}>
                {volunteer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Victim_dashboard;
