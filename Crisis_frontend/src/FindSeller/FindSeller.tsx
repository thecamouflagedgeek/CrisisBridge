import { useState } from 'react';
import styles from './FindSeller.module.css';

const FindSeller = () => {
  const sellers = [
    { name: 'John Doe', material: 'Paper Waste', price: 10 },
    { name: 'Jane Smith', material: 'Plastic Waste', price: 15 },
    { name: 'Emily Johnson', material: 'Glass Waste', price: 20 },
    { name: 'Michael Brown', material: 'E-Waste', price: 25 },
  ];

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e: any) => {
    setSelectedCategory(e.target.value);
  };

  const filteredSellers = sellers.filter(
    (seller) => seller.material === selectedCategory || selectedCategory === ''
  );

  return (
    <div className={styles.style}>
      <div className={styles.glassCard}>
        <h2 className={styles.heading}>Find a Seller</h2>
        <label htmlFor="category" className={styles.label}>
          Select Waste Category:
        </label>
        <select
          id="category"
          className={styles.dropdown}
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">All</option>
          <option value="Paper Waste">Paper Waste</option>
          <option value="Plastic Waste">Plastic Waste</option>
          <option value="Glass Waste">Glass Waste</option>
          <option value="E-Waste">E-Waste</option>
        </select>
        <div className={styles.results}>
          {filteredSellers.length === 0 ? (
            <p className={styles.noResults}>No sellers found for this category.</p>
          ) : (
            <ul className={styles.list}>
              {filteredSellers.map((seller, index) => (
                <li key={index} className={styles.sellerCard}>
                  <p><strong>Name:</strong> {seller.name}</p>
                  <p><strong>Material:</strong> {seller.material}</p>
                  <p><strong>Price:</strong> ${seller.price}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindSeller;
