// HomePage.tsx
import React from 'react';
import styles from './ForBussiness.module.css';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homepageContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <h1>Welcome, User!</h1>
        <h3 className={styles.heroSection}>Turn your waste into wealth!</h3>
        <p className={styles.heroDescription}>
          Businesses can list their products and sell them in an eco-friendly way.
        </p>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Search for Sellers" 
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Product Listing Section */}
      <div className={styles.productListing}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.productCard}>
            <p>Product {index + 1}</p>
            <button 
              className={styles.listProductButton}
              onClick={() => alert('List your product!')}
            >
              <Link to='/product-listing'>List Your Product</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

 {/* Header */}
      {/* <header style={{ backgroundColor: '#004d00', color: 'white', padding: '10px 20px' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/path/to/logo.png" 
              alt="Logo" 
              style={{ height: '40px', marginRight: '10px' }}
            />
            <h1 style={{ margin: 0 }}>SustainaLink</h1>
          </div>
          <ul style={{ display: 'flex', listStyleType: 'none', margin: 0, padding: 0 }}>
            <li style={{ margin: '0 10px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li style={{ margin: '0 10px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>For Business</a></li>
            <li style={{ margin: '0 10px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>For Customers</a></li>
            <li style={{ margin: '0 10px' }}><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header> */}
