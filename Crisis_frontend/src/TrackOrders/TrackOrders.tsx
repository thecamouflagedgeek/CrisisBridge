import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TrackOrders.module.css'

interface TrackingData {
  tracking_id: number;
  order_id: number;
  product_name: string;
  status: string;
  location: string;
  timestamp: string;
}

const TrackOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [filteredData, setFilteredData] = useState<TrackingData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tracking')
      .then((response) => {
        const data: TrackingData[] = response.data;
        setTrackingData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error('Error fetching tracking data:', error);
        setTrackingData([]);
        setFilteredData([]);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = trackingData.filter((item) =>
      item.order_id.toString().includes(searchValue) ||
      item.product_name.toLowerCase().includes(searchValue) ||
      item.status.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  return (
    <div className={styles.trackingPage}>
      <div className={styles.header}>Order Tracking</div>
      <input
        type="text"
        placeholder="Search by Order ID, Product Name, or Status..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchBar}
      />

      <div className={styles.trackingContainer}>
        {filteredData.map((item) => (
          <div key={item.tracking_id} className={styles.trackingCard}>
            <h3 className={styles.cardHeader}>Order ID: {item.order_id}</h3>
            <p><strong>Product:</strong> {item.product_name}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Last Updated:</strong> {new Date(item.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TrackOrders;