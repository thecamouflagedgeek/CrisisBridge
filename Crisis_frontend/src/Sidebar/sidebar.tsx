import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            {/* <div className={styles.logo}>
                <img src="./assets/original-removebg.png" alt="Logo" className={styles.logoImage} />
            </div> */}
            {/* <h3 className={styles.menuHeading}>Menu</h3>
            <ul className={styles.menuList}>
                <li><Link to="/my-profile" className={styles.menuLink}>My Profile</Link></li>
                <li><Link to="/cart" className={styles.menuLink}>My Cart</Link></li>
                <li><Link to="/find-seller" className={styles.menuLink}>Find Seller</Link></li>
                <li><Link to="/track-orders" className={styles.menuLink}>Track Orders</Link></li>
                <li><Link to="/chatroom" className={styles.menuLink}>Chat Room</Link></li>
                <li><Link to="/logout" className={styles.menuLink}>Logout</Link></li>
            </ul> */}
        </div>
    );
};

export default Sidebar;