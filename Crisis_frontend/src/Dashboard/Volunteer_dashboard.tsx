import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import PieChart from "./PieChart.tsx";
import GoogleMap from "./GoogleMap.tsx";

const crises = [
  "Flood Relief in Area X",
  "Food Distribution in City Y",
  "Medical Aid in Region Z",
  "Shelter Assistance in Area W",
];

const Dashboard: React.FC = () => {
  const [selectedCrisis, setSelectedCrisis] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<boolean>(false);
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

  const handleCrisisClick = (crisis: string) => {
    setSelectedCrisis(crisis);
    setConfirming(true);
  };

  const handleConfirm = () => {
    alert(`You have volunteered for: ${selectedCrisis}`);
    setSelectedCrisis(null);
    setConfirming(false);
  };

  return (
    <div className={styles.container}>
      <h1>Volunteer Dashboard</h1>
      <div className={styles.glassCard}>
        {/* Left Section: Pie Chart & Google Map */}
        <div className={styles.leftSection}>
          <div className={styles.pieChart}>
            <PieChart data={[30, 20, 50]} labels={["Location A", "Location B", "Location C"]} />
          </div>
          <div className={styles.mapContainer}>
            {location ? (
              <GoogleMap location={location} />
            ) : (
              <p>Loading map...</p>
            )}
          </div>
        </div>

        {/* Right Section: Crises List */}
        <div className={styles.cardContent}>
          {!confirming ? (
            <>
              <h2>Ongoing Crises</h2>
              <ul className={styles.crisisList}>
                {crises.map((crisis, index) => (
                  <li key={index} onClick={() => handleCrisisClick(crisis)} className={styles.crisisItem}>
                    {crisis}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className={styles.confirmationBox}>
              <h2>Confirm Participation</h2>
              <p>Are you sure you want to volunteer for: <strong>{selectedCrisis}</strong>?</p>
              <button onClick={handleConfirm} className={styles.confirmButton}>Confirm</button>
              <button onClick={() => setConfirming(false)} className={styles.cancelButton}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
