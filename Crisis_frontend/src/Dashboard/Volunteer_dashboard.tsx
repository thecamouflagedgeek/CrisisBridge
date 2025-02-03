import React from 'react';
import styles from './Dashboard.module.css'
import PieChart from './PieChart.tsx'

const Dashboard: React.FC = () => 
{
    return (
        <div className={styles.container}>
            <h1>Volunteer Dashboard</h1>
            <div className={styles.glasscard}>
                <div className={styles.piechart}>
                    <PieChart data={[30, 20, 50]} labels={["Product A", "Product B", "Product C"]} />
                </div>
                <div className={styles.cardContent}>
                    <h1>hello</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;