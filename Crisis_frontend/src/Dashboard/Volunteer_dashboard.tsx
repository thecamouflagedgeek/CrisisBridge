import React from "react";
import styles from "./Dashboard.module.css";
import PieChart from "./PieChart.tsx";
import GoogleMap from "./GoogleMap.tsx";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Volunteer Dashboard</h1>
      <div className={styles.glassCard}>
        {/* Left Section: Pie Chart & Google Map */}
        <div className={styles.leftSection}>
          <div className={styles.pieChart}>
            <PieChart data={[30, 20, 50]} labels={["Product A", "Product B", "Product C"]} />
          </div>
          <div className={styles.mapContainer}>
            <GoogleMap />
          </div>
        </div>

        {/* Right Section: Text Content */}
        <div className={styles.cardContent}>
          <h2>Statistics Overview</h2>
          <p>
            This pie chart represents the distribution of volunteer activities.
          </p>
          <h2>Location</h2>
          <p>Live location of active volunteers.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
