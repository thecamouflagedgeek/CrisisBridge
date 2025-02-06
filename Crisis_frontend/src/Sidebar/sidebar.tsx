import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <h3 className={styles.menuHeading}>Menu</h3>
            <ul className={styles.menuList}>
                <li><Link to="/myprofile" className={styles.menuLink}>My Profile</Link></li>
                <li><Link to="/dashboard" className={styles.menuLink}>Dashboard</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;